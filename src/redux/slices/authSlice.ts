import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppDispatch } from '../store'; // Adjust the path according to your folder structure

const initialState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const login = (email: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
    const { accessToken, refreshToken } = response.data.data;
    dispatch(setCredentials({ accessToken, refreshToken }));
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export default authSlice.reducer;
