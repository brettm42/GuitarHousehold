import type { NextApiRequest, NextApiResponse } from 'next';
import { getAvailableAccounts } from '../../../data/accountservice/accountservice';
import { Account } from '../../../interfaces/models/account';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Account[] | { error: string }>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const accounts = getAvailableAccounts();
    return res.status(200).json(accounts);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: message });
  }
}

