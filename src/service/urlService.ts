import axios from "axios";
import config from "../helpers/config";
import { IURL } from "../types/IURL";
import { getAuthTokenFromCookie } from "../helpers/auth/cookies";
import { useUserStore } from "../zustand/userState";

export const createShortURL = async(url: string, alias?: string)=> {
  const token = getAuthTokenFromCookie();
  const userId = useUserStore.getState().firebaseUid;
  console.log("Creating short URL with:", { url, alias, userId, token });
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
    console.log(res)
    return res.data;
  } catch (error) {
    console.error('Error creating short URL:', error);
    throw error;
  }
}

export const getURlsByUser = async(uId: string): Promise<IURL[]> => {
  const token = getAuthTokenFromCookie();
  try {
    const res = await axios.get(
      config.api.baseUrl + `/api/urls/user/${uId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    console.log(res.data);
    return res.data.urls;
  } catch (error) {
    console.error('Error fetching URLs by user:', error);
    throw error;
  }
}