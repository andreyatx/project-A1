import { collection, type DocumentData, getDocs, query } from 'firebase/firestore';
import { type ChangeEvent, type FC, type FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Priority } from '../components/NewTask';
import { type TaskItem } from '../components/Task';
import { db } from '../firebase';
import { Paths } from '../routes/router';
import { dashboardSelectors } from '../store/features/dashboard/dashboardSlice';
import { dashboardThunks } from '../store/features/dashboard/dashboardThunks';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export const TaskPage: FC = () => {
	const navigate = useNavigate();
	const [task, setTask] = useState<TaskItem>();
	const { categories } = useAppSelector(dashboardSelectors.all);

	const { categoryid, taskid } = useParams();
	const dispatch = useAppDispatch();

	const fetchTaskById = async (categoryid: string | undefined, taskid: string | undefined) => {
		const taskListQuery = query(collection(db, 'TASK_LIST'));
		const data = await getDocs(taskListQuery);
		const tasks: DocumentData[] = [];
		data.forEach(doc => {
			tasks.push({ ...doc.data(), id: doc.id, categoryId: categoryid });
		});
		const [result] = tasks.filter(task => task.taskId === taskid);
		// All tasks array
		return result as TaskItem;
	};

	useEffect(() => {
		dispatch(dashboardThunks.getCategoryList());
	}, []);

	useEffect(() => {
		fetchTaskById(categoryid, taskid).then(task => {
			setTask(task);
		});
	}, [categories]);

	const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (task) {
			dispatch(dashboardThunks.updateTask(task));
			dispatch(dashboardThunks.deleteTask({ categoryId: task.categoryId, task }));
		}

		navigate(Paths.Dashboard);
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = event.target;

		if (task) {
			setTask({
				...task,
				[name]: value,
			});
		}
	};

	if (task) {
		return (
			<div className="container max-w-full h-[calc(100vh_-_144px)] flex justify-center">
				<div className="w-full sm:w-1/2 max-h-fit p-4 my-auto bg-neutral rounded-md ">
					<form onSubmit={submitHandler} className="flex flex-col space-y-4 align-center min-w-fit">
						<h3>Редактирование задачи</h3>
						<input
							tabIndex={1}
							type="text"
							placeholder="Название задачи"
							className="input w-full"
							value={task.title}
							required
							name="title"
							onChange={handleInputChange}
						/>
						<textarea
							tabIndex={2}
							placeholder="Описание (необязательно)"
							className="textarea textarea-md w-full "
							name="description"
							value={task.description}
							onChange={handleInputChange}
						/>

						<div>
							<label className="label">
								<span className="label-text">Категория</span>
							</label>
							<select
								tabIndex={3}
								className="select w-full"
								required
								name="categoryId"
								value={task.categoryId}
								onChange={handleInputChange}>
								{categories.map(category => {
									return (
										<option key={category.id} value={category.id}>
											{category.title}
										</option>
									);
								})}
							</select>
						</div>

						<div>
							<label className="label">
								<span className="label-text">Приоритет</span>
							</label>
							<select tabIndex={4} className="select w-full" required name="priority" onChange={handleInputChange}>
								<option value={Priority.Low}>Низкий</option>
								<option value={Priority.Medium}>Средний</option>
								<option value={Priority.High}>Высокий</option>
							</select>
						</div>
						<div className="flex justify-end">
							<button
								onClick={() => {
									navigate('..');
								}}
								tabIndex={6}
								className="btn max-w-fit rounded-md font-semibold mr-2">
								Отмена
							</button>
							<button tabIndex={5} className="btn bg-green-600 max-w-fit rounded-md font-semibold" type="submit">
								Сохранить
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}

	return <div className="mx-auto spinner"></div>;
};
