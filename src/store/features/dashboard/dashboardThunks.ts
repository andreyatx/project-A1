import { CategoryProps } from './../../../components/Category';
import { TaskProps } from './../../../components/Task';
import { addDoc, collection, deleteDoc, doc, DocumentData, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../firebase';
import { NewTaskProps } from '../../../components/NewTask';

export const addTask = createAsyncThunk('dashboard/add-task', async (data: NewTaskProps) => {
	const TASK_LIST_REF = collection(db, 'CATEGORY_LIST', data.category_id, 'TASK_LIST');

	await addDoc(TASK_LIST_REF, {
		...data,
	});
	console.log(TASK_LIST_REF, data, 'data');
});

export const deleteTask = createAsyncThunk('dashboard/delete-task', async (taskId: string) => {
	await deleteDoc(doc(db, 'TASK_LIST', taskId));
});

export const getTaskList = createAsyncThunk('dashboard/get-task-list', async () => {
	const data = await getDocs(collection(db, 'TASK_LIST'));
	const result: DocumentData[] = [];
	data.forEach(doc => {
		result.push(doc.data());
	});

	// All tasks array
	return result as TaskProps[];
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

export const dashboardThunks = { addTask, getTaskList, deleteTask, getCategoryList };
