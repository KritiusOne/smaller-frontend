import {create} from 'zustand';
import { IURL } from '../types/IURL';

interface userState {
  firebaseUid: string;
  name: string;
  email: string;
  userLinks: IURL[];
  setURLs: (urls: IURL[]) => void;
  setNewURL: (url: IURL) => void;
  logIn: (firebaseUid: string, name: string, email: string) => void;
  logOut: () => void;
}

export const useUserStore = create<userState>((set)=> ({
  firebaseUid: '',
  name: '',
  email: '',
  userLinks: [],
  setURLs: (urls) => set({userLinks: [...urls]}),
  setNewURL: (url) => set((state) => ({userLinks: [...state.userLinks, url]})),
  logIn: (firebaseUid, name, email) => set({firebaseUid, name, email}),
  logOut: () => set({firebaseUid: '', name: '', email: ''})
}))