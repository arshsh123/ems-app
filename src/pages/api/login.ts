import { NextApiRequest, NextApiResponse } from 'next';
import { createSessionToken, setSessionCookie } from '../../lib/auth';

const agencyCredentials: Record<string, string> = {
  "nyc-ems-district-1": "1234",
  "nyc-ems-district-2": "2345",
  "st-marys-hospital": "3456",
  "sunset-nursing-home": "4567"
};

const agencyNames: Record<string, string> = {
  "nyc-ems-district-1": "NYC EMS District 1",
  "nyc-ems-district-2": "NYC EMS District 2",
  "st-marys-hospital": "St. Mary's Hospital",
  "sunset-nursing-home": "Sunset Nursing Home"
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { agencyId, pin } = req.body;

  console.log('Login API received:', { agencyId, pin });

  if (typeof agencyId !== 'string' || typeof pin !== 'string') {
    console.log('Invalid types - agencyId:', typeof agencyId, 'pin:', typeof pin);
    return res.status(400).json({ error: 'Missing or invalid agencyId or pin' });
  }

  const validPin = agencyCredentials[agencyId];
  console.log('Expected PIN for', agencyId, ':', validPin);

  if (validPin && validPin === pin) {
    console.log('PIN validation successful');
    const token = createSessionToken();
    const agencyName = agencyNames[agencyId];
    const expiresAt = Date.now() + 12 * 60 * 60 * 1000; // 12 hours from now

    setSessionCookie(res, token, agencyName);

    return res.status(200).json({
      success: true,
      agencyName,
      expiresAt
    });
  }

  console.log('PIN validation failed');
  return res.status(401).json({
    success: false,
    error: 'Invalid PIN. Try again.'
  });
}