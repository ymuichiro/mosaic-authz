import { NextApiRequest, NextApiResponse } from 'next/types';
import * as oas from 'oas';
import prisma from '@/services/InitPrisma';

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      return getUser(req, res);
    }
    return res.status(405).end();
  } catch (err) {
    console.error(err);
    return res.status(500).end();
  }
}

/**
 * @description GET:/api/user get users list
 */
async function getUser(_: NextApiRequest, res: NextApiResponse<oas.GetUsersResponseInner>) {
  const take = 20;

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      image: true,
    },
    take,
  });

  const data: oas.GetUsersResponseInner['data'] = [];

  for (const user of users) {
    data.push({
      id: user.id,
      name: user.name ?? undefined,
      image: user.image ?? undefined,
    });
  }

  return res.status(200).json({ data });
}
