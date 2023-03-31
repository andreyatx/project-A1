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
	task: TaskItem | undefined;
};

export type UpdateTaskRequest = {
	oldTask: TaskItem;
	newTask: TaskItem;
};

export const addTask = createAsyncThunk('dashboard/add-task', async (data: NewTaskProps) => {
	const TASK_LIST_REF = doc(db, 'CATEGORY_LIST', data.categoryId);
	const taskId = nanoid(6);
	const ALL_TASKS = doc(db, 'TASK_LIST', taskId);
	const timestampValue = Timestamp.now().toDate().toISOString();

	await updateDoc(TASK_LIST_REF, {
		taskList: arrayUnion({ ...data, taskId, timestamp: timestampValue }),
	});

	await setDoc(ALL_TASKS, { ...data, taskId, timestamp: timestampValue });
});

export const updateTask = createAsyncThunk('dashboard/update-task', async (data: UpdateTaskRequest) => {
	const TASK_LIST_REF = doc(db, 'CATEGORY_LIST', data.oldTask.categoryId);

	const ALL_TASKS = doc(db, 'TASK_LIST', data.oldTask.taskId);
	//2023-03-31T15:03:54.713Z
	console.log('old', data.oldTask);
	console.log('new', data.newTask);

	await updateDoc(TASK_LIST_REF, {
		taskList: arrayUnion({ ...data.newTask }),
	});
	await updateDoc(TASK_LIST_REF, {
		taskList: arrayRemove(data.oldTask),
	});

	await setDoc(ALL_TASKS, { ...data.newTask });
});

export const deleteTask = createAsyncThunk('dashboard/delete-task', async (data: DeleteTaskRequest) => {
	const TASK_LIST_REF = doc(db, 'CATEGORY_LIST', data.categoryId);
	if (data.task) {
		const TASK_REF = doc(db, 'TASK_LIST', data.task.taskId);

		await updateDoc(TASK_LIST_REF, {
			taskList: arrayRemove(data.task),
		});

		await deleteDoc(TASK_REF);
	}
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
});

export const dashboardThunks = {
	addTask,
	updateTask,
	deleteTask,
	getTaskById,
	getCategoryList,
	postCategoryList,
};
