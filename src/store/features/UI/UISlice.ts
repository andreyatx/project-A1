import { RootState } from './../../store';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isModalOpen: false,
};

export const UISlice = createSlice({
	name: 'UI',
	initialState,
	reducers: {
		openModal: state => {
			state.isModalOpen = true;
		},
		closeModal: state => {
			state.isModalOpen = false;
		},
	},
});

export const UISelectors = {
	all: (state: RootState) => state.UI,
};

export const UIActions = UISlice.actions;
export const UIReducer = UISlice.reducer;
