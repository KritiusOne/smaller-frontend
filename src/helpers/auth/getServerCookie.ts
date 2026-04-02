import 'server-only';
import { cookies } from 'next/headers';
import { decodeAuthTokenPayload } from '@/src/helpers/auth/decodeToken';
export const getServerCookie = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token || token.trim().length === 0) {
    return {
      isLogged: false,
      email: null,
      firebaseUid: null,
      token: null
    };
  }

  const tokenPayload = decodeAuthTokenPayload(token);
  const tokenFirebaseUid =
    typeof tokenPayload?.firebaseUid === 'string'
      ? tokenPayload.firebaseUid
      : typeof tokenPayload?.userId === 'string'
        ? tokenPayload.userId
        : typeof tokenPayload?.id === 'string'
          ? tokenPayload.id
          : typeof tokenPayload?.sub === 'string'
            ? tokenPayload.sub
            : null;
  const userEmail = typeof tokenPayload?.email === 'string' ? tokenPayload.email : null;
  if(!tokenFirebaseUid){
    return {
      isLogged: false,
      email: null,
      firebaseUid: null,
      token: null
    };
  }
  return {
    isLogged: true,
    firebaseUid: tokenFirebaseUid,
    email: userEmail,
    token: token
  }
}