import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  status: 'checking' | 'authenticated' | 'notAuthenticated';
  uid: string | null;
  email: string;
  username: string | null;
  errorMessage: string | null
}


const initialState: AuthState = {
  status: 'checking',
  uid: '',
  email: '',
  username: null,
  errorMessage: null
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ id: string; email: string; username: string }>) => {
      state.status = "authenticated";
      state.uid = action.payload.id;
      state.email = action.payload.email;
      state.username = action.payload.username;
      state.errorMessage = null;
    },
    logout: (state, action: PayloadAction<{ errorMessage?: string }>) => {
      state.status = "notAuthenticated";
      state.uid = '';
      state.email = '';
      state.username = null;
      state.errorMessage = action.payload.errorMessage || null;
    },
    checkingCredentials: (state) => {
      state.status = "checking";
    },
  },
});


export const { login, logout, checkingCredentials } = authSlice.actions;