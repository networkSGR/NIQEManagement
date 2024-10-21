import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import niqeReducer from './slices/niqeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    niqe: niqeReducer,

  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
