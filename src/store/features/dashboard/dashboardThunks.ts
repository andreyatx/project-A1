import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import {
	arrayRemove,
	arrayUnion,
	collection,
	deleteDoc,
	doc,
	type DocumentData,
	getDocs,
	limit,
	orderBy,
	query,
	setDoc,
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

export type UpdateTaskRequest = {
	taskId: string;
	title: string;
	description: string;
	categoryId: string;
	priority: string;
};

export const addTask = createAsyncThunk('dashboard/add-task', async (data: NewTaskProps) => {
	const TASK_LIST_REF = doc(db, 'CATEGORY_LIST', data.categoryId);
	const taskId = nanoid(6);
	const ALL_TASKS = doc(db, 'TASK_LIST', taskId);

	await updateDoc(TASK_LIST_REF, {
		taskList: arrayUnion({ ...data, taskId, timestamp: Timestamp.now().toDate().toISOString() }),
	});

	await setDoc(ALL_TASKS, { ...data, taskId, timestamp: Timestamp.now().toDate().toISOString() });
});

export const updateTask = createAsyncThunk('dashboard/update-task', async (data: UpdateTaskRequest) => {
	const TASK_LIST_REF = doc(db, 'CATEGORY_LIST', data.categoryId);

	const ALL_TASKS = doc(db, 'TASK_LIST', data.taskId);

	await updateDoc(TASK_LIST_REF, {
		taskList: arrayUnion({ ...data }),
	});

	await setDoc(ALL_TASKS, { ...data });
});

export const deleteTask = createAsyncThunk('dashboard/delete-task', async (data: DeleteTaskRequest) => {
	const TASK_LIST_REF = doc(db, 'CATEGORY_LIST', data.categoryId);
	const TASK_REF = doc(db, 'TASK_LIST', data.task.taskId);

	await updateDoc(TASK_LIST_REF, {
		taskList: arrayRemove(data.task),
	});

	await deleteDoc(TASK_REF);
});

export const getTaskById = createAsyncThunk('dashboard/get-task-list', async (taskid: string | undefined) => {
	const taskListQuery = query(collection(db, 'TASK_LIST'));
	const data = await getDocs(taskListQuery);

	const tasks: DocumentData[] = [];

	data.forEach(doc => {
		tasks.push({ ...doc.data(), id: doc.id });
	});

	const [result] = tasks.filter(task => task.taskId === taskid);

	// All tasks array
	return result as TaskItem;
});

// export const getTaskList = createAsyncThunk('dashboard/get-task-list', async () => {
// 	const taskListQuery = query(collection(db, 'TASK_LIST'));
// 	const data = await getDocs(taskListQuery);

// 	const result: DocumentData[] = [];

// 	data.forEach(doc => {
// 		result.push({ ...doc.data(), id: doc.id });
// 	});

// 	// All tasks array
// 	return result as TaskItem[];
// });

// export const postTaskList = createAsyncThunk('dashboard/post-task-list', async () => {
// 	const taskListQuery = query(collection(db, 'TASK_LIST'));
// 	const data = await getDocs(taskListQuery);

// 	const result: DocumentData[] = [];

// 	data.forEach(doc => {
// 		result.push({ ...doc.data(), id: doc.id });
// 	});

// 	// All tasks array
// 	return result as TaskItem[];
// });

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

		const updatedList = category.taskList.map(task => {
			return { ...task, categoryId: category.id };
		});

		await updateDoc(TASK_LIST_REF, {
			taskList: updatedList,
		});
	});
	console.log('postcatlist', data);
});

export const dashboardThunks = {
	addTask,
	updateTask,
	deleteTask,
	getTaskById,
	getCategoryList,
	postCategoryList,
};
