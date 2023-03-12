import { type FC } from 'react';

import { Task, type TaskItem } from './Task';

type TaskListProps = {
	// categoryId: string;
	taskList: TaskItem[];
};

export const TaskList: FC<TaskListProps> = ({ taskList }) => {
	return (
		<>
			{taskList.map((task, index) => {
				return <Task key={task.title} {...task} task={task} index={index} />;
			})}
		</>
	);
};
