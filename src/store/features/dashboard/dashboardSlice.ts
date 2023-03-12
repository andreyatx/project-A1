import { createSlice } from '@reduxjs/toolkit';

import { type CategoryProps } from '../../../components/Category';
import { IconNames } from '../../../components/Icon';
import { type RootState } from '../../store';
import { dashboardThunks } from './dashboardThunks';

type DashboardStateType = {
	categories: CategoryProps[];
	isLoading: boolean;
};

const initialState = {
	categories: [
		{
			id: '1',
			title: 'Backlog',
			iconName: IconNames.Backlog,
			taskList: [],
		},
		{
			id: '2',
			title: 'In Progress',
			iconName: IconNames.InProgress,
			taskList: [],
		},
		{
			id: '3',
			title: 'Done',
			iconName: IconNames.Done,
			taskList: [],
		},
	],
	isLoading: false,
} as unknown as DashboardStateType;

export const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(dashboardThunks.getCategoryList.pending, state => {
			state.isLoading = true;
		});

		builder.addCase(dashboardThunks.getCategoryList.fulfilled, (state, { payload }) => {
			state.categories = payload;
			state.isLoading = false;
		});
	},
});

export const dashboardSelectors = {
	all: (state: RootState) => state.dashboard,
};

export const dashboardActions = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
