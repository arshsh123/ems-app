import { NextApiRequest, NextApiResponse } from 'next';
import patients from '../../../data/patients';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid patient ID' });
  }

  const session = req.cookies.session;

  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const patient = patients.find(p => p.id === id);

  if (patient) {
    return res.status(200).json(patient);
  }

  return res.status(404).json({ error: 'Patient not found' });
}