import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res
    .status(403)
    .json({ data: 'Access to the API possible only internally in the Dapp!' });
}
