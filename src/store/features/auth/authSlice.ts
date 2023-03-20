import { createSlice } from '@reduxjs/toolkit';

import { type RootState } from './../../store';

type AuthState = {
	isLoading: boolean;
	user: User | null;
};

export type User = {
	uid: string;
	email: string;
	displayName?: string;
	photoURL?: string;
};

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isLoading: false,
		user: null,
	} as AuthState,
	reducers: {
		setUser: (state, { payload }) => {
			state.user = payload;
		},
	},
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;

export const authSelectors = {
	all: (state: RootState) => state.auth,
	user: (state: RootState) => state.auth.user,
};
