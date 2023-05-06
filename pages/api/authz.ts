import { authOptions } from '@/pages/api/auth/[...nextauth]';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { Account } from 'symbol-sdk/dist/src/model/account/Account';
import { PublicAccount } from 'symbol-sdk/dist/src/model/account/PublicAccount';
import { EncryptedMessage } from 'symbol-sdk/dist/src/model/message/EncryptedMessage';

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      return postHandle(req, res);
    }
    return res.status(405).end();
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
}

/**
 * Discord に OAuth ログイン済みである場合、 POST の Body に含まれる情報より秘密鍵の所有を証明し、
 * 証明が正しく、かつそのアカウントが特定Mosaicを所有している場合 OK とする
 */
async function postHandle(req: NextApiRequest, res: NextApiResponse) {
  const session: any = await getServerSession(req, res, authOptions);
  if (!session || !session.user) {
    return res.status(401).end();
  }

  // get environments
  const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
  const DISCORD_ROLE_ID = process.env.DISCORD_ROLE_ID;
  const DISCORD_SERVER_ID = process.env.DISCORD_SERVER_ID;
  const SYMBOL_MOSAIC_ID = process.env.SYMBOL_MOSAIC_ID;
  const SYSTEM_PRIVATEKEY = process.env.SYMBOL_ADMIN_PRIVATE_KEY;
  const SYMBOL_NETWORK_TYPE = Number(process.env.SYMBOL_NETWORK_TYPE);
  const SYMBOL_NODE_URL = process.env.SYMBOL_NODE_URL;

  if (
    !DISCORD_BOT_TOKEN ||
    !DISCORD_ROLE_ID ||
    !DISCORD_SERVER_ID ||
    !SYMBOL_MOSAIC_ID ||
    !SYSTEM_PRIVATEKEY ||
    SYMBOL_NETWORK_TYPE.toString() === 'NaN' ||
    !SYMBOL_NODE_URL
  ) {
    throw new Error('is not defined environment');
  }

  const { userPublicKey, token } = req.body;

  // 秘密鍵所有証明
  const systemAccount = Account.createFromPrivateKey(SYSTEM_PRIVATEKEY, SYMBOL_NETWORK_TYPE);
  const userPublicAccount = PublicAccount.createFromPublicKey(userPublicKey, SYMBOL_NETWORK_TYPE);
  const { payload } = systemAccount.decryptMessage(new EncryptedMessage(token, userPublicAccount), userPublicAccount);

  if (payload !== 'Prove me right.') {
    return res.status(404).end();
  }

  // mosaic 所有確認
  const symbolAccountInfo = await axios.get(`${SYMBOL_NODE_URL}/accounts/${userPublicAccount.address.plain()}`);

  const mosaicIds: string[] = [];
  for (const mosaic of symbolAccountInfo.data.account.mosaics) {
    if (mosaic.amount !== 0) {
      mosaicIds.push(mosaic.id);
    }
  }

  if (mosaicIds.find((id) => id === SYMBOL_MOSAIC_ID) === undefined) {
    console.error('指定されたMosaicを所有していません');
    return res.status(404).end();
  }

  // role 付与
  const headers = {
    Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
    'Content-Type': 'application/json',
  };
  const uri = `https://discordapp.com/api/guilds/${DISCORD_SERVER_ID}/members/${session.user.id}/roles/${DISCORD_ROLE_ID}`;
  const r = await axios.put(uri, undefined, { headers });

  if (r.status === 204) {
    return res.status(204).end();
  } else {
    return res.status(404).end();
  }
}
