import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './features/auth/authSlice';
import { dashboardReducer } from './features/dashboard/dashboardSlice';
import { profileReducer } from './features/profile/profileSlice';
import { UIReducer } from './features/UI/UISlice';

export const store = configureStore({
	reducer: {
		dashboard: dashboardReducer,
		UI: UIReducer,
		auth: authReducer,
		profile: profileReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
