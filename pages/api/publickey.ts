import type { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      if (!process.env.SYMBOL_ADMIN_PUBLIC_KEY) throw new Error(`SYMBOL_ADMIN_PUBLIC_KEY is not defined`);
      return res.status(200).json({ adminPublicKey: process.env.SYMBOL_ADMIN_PUBLIC_KEY });
    }
    return res.status(405).end();
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
}
