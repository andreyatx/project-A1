import { TaskProps } from './../../../components/Task';
import { dashboardThunks } from './dashboardThunks';
import { createSlice } from '@reduxjs/toolkit';
import { IconNames } from '../../../components/Icon';

import { type RootState } from '../../store';
import { CategoryProps } from '../../../components/Category';

type DashboardStateType = {
	categories: CategoryProps[];
	taskList: TaskProps[];
};

const initialState = {
	categories: [
		{
			id: '1',
			title: 'Backlog',
			iconName: IconNames.Backlog,
		},
		{
			id: '2',
			title: 'In Progress',
			iconName: IconNames.InProgress,
		},
		{
			id: '3',
			title: 'Done',
			iconName: IconNames.Done,
		},
	],
	taskList: [],
} as unknown as DashboardStateType;

export const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(dashboardThunks.getTaskList.fulfilled, (state, { payload }) => {
			state.taskList = payload;
		});
	},
});

export const dashboardSelectors = {
	all: (state: RootState) => state.dashboard,
};

export const dashboardActions = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
