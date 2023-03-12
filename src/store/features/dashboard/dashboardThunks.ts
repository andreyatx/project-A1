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
	// const TASK_LIST_REF = collection(db, 'CATEGORY_LIST', data.categoryId, 'TASK_LIST');
	const TASK_LIST_REF = doc(db, 'CATEGORY_LIST', data.categoryId);

	await updateDoc(TASK_LIST_REF, {
		// taskList: arrayUnion({ ...data }),
		taskList: arrayUnion({ ...data, taskId: nanoid(6), timestamp: Timestamp.now().toDate().toISOString() }),
	});
});

export const deleteTask = createAsyncThunk('dashboard/delete-task', async (data: DeleteTaskRequest) => {
	const TASK_LIST_REF = doc(db, 'CATEGORY_LIST', data.categoryId);

	await updateDoc(TASK_LIST_REF, {
		taskList: arrayRemove(data.task),
	});
});

// export const getTaskList = createAsyncThunk('dashboard/get-task-list', async () => {
// 	const data = await getDocs(collection(db, 'TASK_LIST'));
// 	const result: DocumentData[] = [];
// 	data.forEach(doc => {
// 		result.push(doc.data());
// 	});

// 	// All tasks array
// 	return result as TaskProps[];
// });

// export const getTaskList = createAsyncThunk('dashboard/get-task-list', async () => {
// 	const taskListQuery = query(collectionGroup(db, 'TASK_LIST'));
// 	const querySnapshot = await getDocs(taskListQuery);
// 	const result: DocumentData[] = [];

// 	querySnapshot.forEach(doc => {
// 		result.push({ ...doc.data(), id: doc.id });
// 	});

// 	// All tasks array
// 	return result as TaskProps[];
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

export const dashboardThunks = { addTask, deleteTask, getCategoryList };
