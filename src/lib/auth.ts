import { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export interface Session {
  agencyId: string;
  agencyName: string;
  token: string;
  expiresAt: number;
}

export function getSession(req: NextApiRequest): Session | null {
  const sessionToken = req.cookies.session;
  if (!sessionToken) {
    return null;
  }

  // For simplicity, assume the session is valid and return a mock session object
  // In a real implementation, you would validate the token and fetch session details
  return {
    agencyId: 'mock-agency-id',
    agencyName: 'Mock Agency',
    token: sessionToken,
    expiresAt: Date.now() + 12 * 60 * 60 * 1000 // Mock expiration time (12 hours from now)
  };
}

export function createSessionToken(): string {
  return crypto.randomBytes(16).toString('hex');
}

export function setSessionCookie(res: NextApiResponse, token: string, agencyName: string): void {
  const maxAge = 12 * 60 * 60; // 12 hours in seconds
  const secureAttr = process.env.NODE_ENV === 'production' ? ' Secure;' : '';
  res.setHeader('Set-Cookie', `session=${token}; HttpOnly;${secureAttr} Path=/; Max-Age=${maxAge}`);
}

export function clearSessionCookie(res: NextApiResponse): void {
  const secureAttr = process.env.NODE_ENV === 'production' ? ' Secure;' : '';
  res.setHeader('Set-Cookie', `session=;${secureAttr} Path=/; Max-Age=0`);
}