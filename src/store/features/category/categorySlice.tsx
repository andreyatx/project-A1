import { ArrowRightCircleIcon, CheckCircleIcon, RectangleStackIcon } from '@heroicons/react/24/solid';
import { createSlice } from '@reduxjs/toolkit';

import { type RootState } from '../../store';

const initialState = {
	categories: [
		{
			id: 1,
			title: 'Backlog',
			icon: <RectangleStackIcon className="h-4 w-4 text-gray-400" />,
			taskList: [
				{
					id: 1,
					taskId: 'fh12',
					title: 'Task Title',
					priority: 'priority',
					tags: 'tags',
					avatar: '',
				},
				{
					id: 2,
					taskId: 'fh12',
					title: 'Task Title',
					priority: 'priority',
					tags: 'tags',
					avatar: '',
				},
				{
					id: 3,
					taskId: 'fh12',
					title: 'Task Title',
					priority: 'priority',
					tags: 'tags',
					avatar: '',
				},
			],
		},
		{
			id: 2,
			title: 'In Progress',
			icon: <ArrowRightCircleIcon className="h-4 w-4 text-yellow-300" />,
			taskList: [
				{
					id: 1,
					taskId: 'fh12',
					title: 'Task Title',
					priority: 'priority',
					tags: 'tags',
					avatar: '',
				},
				{
					id: 2,
					taskId: 'fh12',
					title: 'Task Title',
					priority: 'priority',
					tags: 'tags',
					avatar: '',
				},
			],
		},
		{
			id: 3,
			title: 'Done',
			icon: <CheckCircleIcon className="h-4 w-4 text-green-500" />,
			taskList: [
				{
					id: 1,
					taskId: 'fh12',
					title: 'Task Title',
					priority: 'priority',
					tags: 'tags',
					avatar: '',
				},
			],
		},
	],
};

export const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {
		addTask: (state, { payload }) => {
			console.log('state', state.categories);

			state.categories[0].taskList.push(payload);
		},
	},
});

export const categorySelectors = {
	all: (state: RootState) => state.category,
};

export const categoryActions = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
