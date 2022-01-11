import { configureStore } from '@reduxjs/toolkit';
import registerSlice from './slices/registerSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
	reducer: {
		user: userSlice,
		register: registerSlice,
	},
});
