import { Modal } from './Modal';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { dashboardThunks } from '../store/features/dashboard/dashboardThunks';

export type NewTaskProps = { title: string; description: string; category_id: number; priority: number };

const initalValues: NewTaskProps = {
	title: '',
	description: '',
	category_id: 1,
	priority: 0,
};

enum Priority {
	Low = 0,
	Medium = 1,
	High = 2,
}

export const NewTask: FC = () => {
	const dispatch = useAppDispatch();
	const [newTask, setNewTask] = useState<NewTaskProps>(initalValues);

	const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		dispatch(dashboardThunks.addTask(newTask));
	};

	const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = event.target;

		setNewTask({
			...newTask,
			[name]: value,
		});
		console.log(newTask);
	};

	return (
		<Modal>
			<form onSubmit={submitHandler} className="flex flex-col space-y-4 align-center min-w-fit">
				<span>Создать новую задачу</span>
				<input
					tabIndex={1}
					type="text"
					placeholder="Название задачи"
					className="input w-full "
					required
					value={newTask.title}
					name="title"
					onChange={handleInputChange}
				/>
				<textarea
					tabIndex={2}
					placeholder="Описание (необязательно)"
					className="textarea textarea-md w-full "
					value={newTask.description}
					name="description"
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
						value={newTask.category_id}
						onChange={handleInputChange}
						name="category_id">
						<option value={1}>Backlog</option>
						<option value={2}>In Progress</option>
						<option value={3}>Done</option>
					</select>
				</div>

				<div>
					<label className="label">
						<span className="label-text">Приоритет</span>
					</label>
					<select
						tabIndex={4}
						className="select w-full"
						required
						value={newTask.priority}
						onChange={handleInputChange}
						name="priority">
						<option value={Priority.Low}>Низкий</option>
						<option value={Priority.Medium}>Средний</option>
						<option value={Priority.High}>Высокий</option>
					</select>
				</div>

				<button
					tabIndex={5}
					className="btn bg-green-600 btn-md min-w-full rounded-md font-semibold text-white self-center"
					type="submit">
					Создать
				</button>
			</form>
		</Modal>
	);
};
