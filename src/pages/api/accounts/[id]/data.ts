import type { NextApiRequest, NextApiResponse } from 'next';
import { getAccountDatabase, getAccountById } from '../../../../data/accountservice/accountservice';
import { AccountData } from '../../../../interfaces/models/account';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<AccountData | { error: string }>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const { id } = req.query;
    const accountId = Array.isArray(id) ? id[0] : id;

    const account = getAccountById(accountId);
    if (!account) {
      return res.status(404).json({ error: `Account with ID "${accountId}" not found` });
    }

    const data = getAccountDatabase(accountId);
    return res.status(200).json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: message });
  }
}

