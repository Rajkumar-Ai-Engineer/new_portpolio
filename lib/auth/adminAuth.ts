import crypto from 'crypto';

const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'rajkumar_admin_governance_secret_2026';
export const ADMIN_COOKIE_NAME = 'admin_session';

export interface AdminSession {
  email: string;
  role: 'admin';
  exp: number;
}

export function createAdminToken(email: string): string {
  const exp = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days
  const payload = JSON.stringify({ email, role: 'admin', exp });
  const encodedPayload = Buffer.from(payload).toString('base64url');
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(encodedPayload)
    .digest('base64url');
  return `${encodedPayload}.${signature}`;
}

export function verifyAdminToken(token: string | undefined | null): AdminSession | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [encodedPayload, signature] = parts;
  const expectedSignature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(encodedPayload)
    .digest('base64url');

  if (signature !== expectedSignature) return null;

  try {
    const jsonStr = Buffer.from(encodedPayload, 'base64url').toString('utf-8');
    const session = JSON.parse(jsonStr) as AdminSession;
    if (session.exp && session.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }
    return session;
  } catch {
    return null;
  }
}
