import { TaskProps } from './../../../components/Task';
import { addDoc, collection, deleteDoc, doc, DocumentData, getDocs } from 'firebase/firestore';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '../../../firebase';
import { NewTaskProps } from '../../../components/NewTask';

export const addTask = createAsyncThunk('dashboard/add-task', async (data: NewTaskProps) => {
	await addDoc(collection(db, 'TASK_LIST'), {
		...data,
	});
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

export const dashboardThunks = { addTask, getTaskList, deleteTask };
