import type { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      const callback = process.env.CALLBACK_URL;

      if (!callback) throw new Error(`CALLBACK_URL is not defined`);

      return res.status(200).json({ callback });
    }
    return res.status(405).end();
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
}
