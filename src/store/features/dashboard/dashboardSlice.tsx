import { ArrowRightCircleIcon, CheckCircleIcon, RectangleStackIcon } from '@heroicons/react/24/solid';
import { createSlice } from '@reduxjs/toolkit';

import { type RootState } from '../../store';

const initialState = {
	categories: [
		{
			id: 1,
			title: 'Backlog',
			icon: <RectangleStackIcon className="h-4 w-4 text-gray-400" />,
		},
		{
			id: 2,
			title: 'In Progress',
			icon: <ArrowRightCircleIcon className="h-4 w-4 text-yellow-300" />,
		},
		{
			id: 3,
			title: 'Done',
			icon: <CheckCircleIcon className="h-4 w-4 text-green-500" />,
		},
	],
	taskList: [],
};

export const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {
		addTask: (state, { payload }) => {
			console.log('state', state.categories);
		},
	},
});

export const dashboardSelectors = {
	all: (state: RootState) => state.dashboard,
};

export const dashboardActions = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
