import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import adminCheckBoxSlice from './slice/adminCheckBox.slice';
import authSlice from './slice/auth.slice';
import postCheckBoxSlice from './slice/postCheckBox.slice';

export const store = () => {
  return configureStore({
    reducer: { authSlice, postCheckBoxSlice, adminCheckBoxSlice },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
