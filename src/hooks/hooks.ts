import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store'; // Ensure the path to store is correct
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '@/redux/store'; // Make sure the path to store is correct

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
