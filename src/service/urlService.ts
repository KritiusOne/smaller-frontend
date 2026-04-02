import axios from "axios";
import config from "../helpers/config";
import { getAuthTokenFromCookie } from "../helpers/auth/cookies";
import { useUserStore } from "../zustand/userState";

export const createShortURL = async(url: string, alias?: string) => {
  const token = getAuthTokenFromCookie();
  const userId = useUserStore.getState().firebaseUid;

  try {
    if(!userId){
      throw new Error('Usuario no autenticado');
    }
    if(!token){
      throw new Error('Token de autenticación no encontrado');
    }
    const res = await axios.post(
      config.api.baseUrl + "/api/urls",
      { originalURL: url, alias, userId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return {
      status: res.status,
      data: res.data
    };
  } catch (error) {
    console.error('Error creating short URL:', error);
    throw error;
  }
}
