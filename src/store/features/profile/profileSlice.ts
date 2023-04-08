// type ProfileState = {
//   user:unknown

import { createSlice } from '@reduxjs/toolkit';

import { type RootState } from '../../store';

// }
const initialState = {
	user: null,
	users: [],
};

export const profileSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {},
});

export const profileSelectors = {
	all: (state: RootState) => state.profile,
};

export const profileActions = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
