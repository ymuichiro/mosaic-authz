import type { NextApiRequest, NextApiResponse } from 'next/types';

/**
 * Mosaic 認証にあたり必要な情報を返却する
 */
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const adminPublicKey = process.env.SYMBOL_ADMIN_PUBLIC_KEY;
      const mosaicId = process.env.SYMBOL_MOSAIC_ID;
      const networkType = process.env.SYMBOL_NETWORK_TYPE;

      if (!adminPublicKey) throw new Error(`SYMBOL_ADMIN_PUBLIC_KEY is not defined`);
      if (!mosaicId) throw new Error(`SYMBOL_MOSAIC_ID is not defined`);
      if (!networkType) throw new Error(`SYMBOL_NETWORK_TYPE is not defined`);

      return res.status(200).json({
        adminPublicKey,
        mosaicId,
        networkType: networkType === '104' ? 'MainNet' : 'TestNet',
      });
    }
    return res.status(405).end();
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
}
