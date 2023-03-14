import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import {
	arrayRemove,
	arrayUnion,
	collection,
	doc,
	type DocumentData,
	getDocs,
	limit,
	orderBy,
	query,
	Timestamp,
	updateDoc,
} from 'firebase/firestore';

import { type NewTaskProps } from '../../../components/NewTask';
import { db } from '../../../firebase';
import { type CategoryProps } from './../../../components/Category';
import { type TaskItem } from './../../../components/Task';

type DeleteTaskRequest = {
	categoryId: string;
	task: TaskItem;
};

export const addTask = createAsyncThunk('dashboard/add-task', async (data: NewTaskProps) => {
	const TASK_LIST_REF = doc(db, 'CATEGORY_LIST', data.categoryId);

	await updateDoc(TASK_LIST_REF, {
		taskList: arrayUnion({ ...data, taskId: nanoid(6), timestamp: Timestamp.now().toDate().toISOString() }),
	});
});

export const deleteTask = createAsyncThunk('dashboard/delete-task', async (data: DeleteTaskRequest) => {
	const TASK_LIST_REF = doc(db, 'CATEGORY_LIST', data.categoryId);

	await updateDoc(TASK_LIST_REF, {
		taskList: arrayRemove(data.task),
	});
});

export const getCategoryList = createAsyncThunk('dashboard/get-category-list', async () => {
	const categoryListQuery = query(collection(db, 'CATEGORY_LIST'), orderBy('order'), limit(99));
	const data = await getDocs(categoryListQuery);
	const result: DocumentData[] = [];

	data.forEach(doc => {
		result.push({ ...doc.data(), id: doc.id });
	});

	// All categories array
	return result as CategoryProps[];
});

export const postCategoryList = createAsyncThunk('dashboard/post-category-list', async (data: CategoryProps[]) => {
	data.map(async category => {
		const TASK_LIST_REF = doc(db, 'CATEGORY_LIST', category.id);
		const updatedList = category.taskList;

		await updateDoc(TASK_LIST_REF, {
			taskList: updatedList,
		});
	});
});

export const dashboardThunks = { addTask, deleteTask, getCategoryList, postCategoryList };
