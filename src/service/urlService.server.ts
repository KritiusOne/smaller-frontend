import axios from "axios";
import config from "../helpers/config";
import { IURL } from "../types/IURL";

export const getURlsByUser = async (uId: string, token: string): Promise<IURL[]> => {
  try {
    const res = await axios.get(
      config.api.baseUrl + `/api/urls/user/${uId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res.data);
    return res.data.urls;
  } catch (error) {
    console.error('Error fetching URLs by user:', error);
    throw error;
  }
};
