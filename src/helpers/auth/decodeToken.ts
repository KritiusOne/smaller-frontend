
import 'server-only';

type AuthTokenPayload = {
  sub?: string;
  id?: string;
  userId?: string;
  firebaseUid?: string;
  name?: string;
  email?: string;
};
export const decodeAuthTokenPayload = (token: string): AuthTokenPayload | null => {
  const tokenParts = token.split('.');
  if (tokenParts.length < 2) {
    return null;
  }

  try {
    const payload = tokenParts[1].replace(/-/g, '+').replace(/_/g, '/');
    const decodedPayload = Buffer.from(payload.padEnd(Math.ceil(payload.length / 4) * 4, '='), 'base64').toString('utf-8');
    return JSON.parse(decodedPayload) as AuthTokenPayload;
  } catch {
    return null;
  }
};