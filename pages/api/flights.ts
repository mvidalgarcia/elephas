import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  origin: string,
  destination: string,
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ origin: 'BCN', destination: 'OVD' })
}
