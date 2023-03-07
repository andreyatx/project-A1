import { collection, DocumentData, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState, type FC } from 'react';
import { db } from '../firebase';

import { dashboardSelectors } from '../store/features/dashboard/dashboardSlice';
import { UIActions } from '../store/features/UI/UISlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Category } from './Category';
import { NewTask } from './NewTask';
import { TaskProps } from './Task';

export const Dashboard: FC = () => {
	const { categories } = useAppSelector(dashboardSelectors.all);
	const [taskList, setTaskList] = useState<TaskProps[]>([]);
	const dispatch = useAppDispatch();

	const openModalHandler = () => {
		dispatch(UIActions.openModal());
	};

	useEffect(() => {
		const taskListQuery = query(collection(db, 'TASK_LIST'));

		onSnapshot(taskListQuery, querySnapshot => {
			const result: DocumentData[] = [];

			querySnapshot.forEach(doc => {
				result.push({ ...doc.data(), id: doc.id });
			});

			setTaskList(result as TaskProps[]);
		});
	}, []);

	return (
		<>
			<div className="container flex flex-col align-center">
				<NewTask />
				<div className="add-task mb-4">
					<button onClick={openModalHandler} className="btn">
						Создать задачу
					</button>
				</div>
				<div className="flex flex-row space-x-8 ">
					{categories.map(category => (
						<Category key={category.id} {...category} taskList={taskList} />
					))}
				</div>
			</div>
		</>
	);
};
