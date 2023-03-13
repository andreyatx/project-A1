import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid';
import { type FC } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { dashboardThunks } from '../store/features/dashboard/dashboardThunks';
import { useAppDispatch } from '../store/hooks';
import { Avatar } from './Avatar';

export type TaskItem = {
	taskId: string;
	categoryId: string;
	title: string;
	description: string;
	priority: string;
	tags: string;
	avatar?: string;
};

export type TaskProps = {
	task: TaskItem;
	index: number; // Index of task in the array
};

export const Task: FC<TaskProps> = ({ task, index }) => {
	const dispatch = useAppDispatch();
	const deleteHandler = (categoryId: string, task: TaskItem) => {
		dispatch(dashboardThunks.deleteTask({ categoryId, task }));
	};

	return (
		<Draggable draggableId={task.taskId} index={index}>
			{provided => (
				<div
					className="card w-80 h-24 bg-neutral rounded-sm flex flex-row p-2 mb-2"
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}>
					<div className="left-block flex flex-col">
						<div className="mb-2">{task.title ?? 'Название задачи'}</div>

						<div className="flex flex-row mt-auto">
							<div className="text-sm text-slate-300">Приоритет {task.priority ?? 'Priority'}</div>
							<div className="text-sm text-slate-300 ml-2">{task.tags ?? 'Tags'}</div>
						</div>
					</div>

					<div className="right-block ml-auto flex flex-col justify-between">
						<Avatar avatar={task.avatar} />

						<div className="flex dropdown dropdown-end">
							<button className="max-w-fit bg-transparent rounded-md focus:bg-slate-400 hover:bg-slate-400 ml-2">
								<EllipsisHorizontalIcon className="h-6 w-6 text-white self-center" />
							</button>
							<ul className="dropdown-content menu shadow bg-neutral rounded-box mt-6">
								<li>
									<button className="hover:bg-slate-400">Редактировать</button>
								</li>
								<li>
									<button
										draggable={false}
										onClick={() => deleteHandler(task.categoryId, task)}
										className="hover:bg-slate-400 text-red-600">
										Удалить
									</button>
								</li>
							</ul>
						</div>
					</div>
				</div>
			)}
		</Draggable>
	);
};
