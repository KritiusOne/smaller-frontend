import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import config from "../helpers/config";
import { initializeApp } from "firebase/app";
import { IUser } from "../types/IUser";

const firebaseApp = initializeApp(config.firebase);
const auth = getAuth(firebaseApp);
  
function SignIn(email: string, password: string) {
  const userInfo = signInWithEmailAndPassword(auth, email, password)
    .then(async (userInfo) => {
      const response = await getUser(userInfo.user.uid, await userInfo.user.getIdToken());
      if(response) {
        return {
          user: response,
          token: await userInfo.user.getIdToken(),
        };
      }
    })  
    .catch((error) => console.error(error));
  return userInfo;
}

async function getUser(uId: string, token: string) {
  const response = await fetch(config.api.baseUrl + `/api/users/${uId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  const user: IUser = await response.json();
  return user;
}

export const authService = {
  SignIn,
};