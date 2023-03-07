import { configureStore } from '@reduxjs/toolkit';

import { dashboardReducer } from './features/dashboard/dashboardSlice';
import { UIReducer } from './features/UI/UISlice';

export const store = configureStore({
	reducer: {
		dashboard: dashboardReducer,
		UI: UIReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
