import { EllipsisHorizontalIcon, PlusIcon } from '@heroicons/react/24/solid';
import { type FC } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { Icon } from './Icon';
import { type TaskItem } from './Task';
import { TaskList } from './TaskList';

export type CategoryProps = {
	id: string;
	iconName: string;
	title: string;
	taskList: TaskItem[];
};

const CategoryInfo: FC<Omit<CategoryProps, 'id' | 'taskList'>> = ({ iconName, title }) => {
	return (
		<div className="flex flex-row justify-between items-center">
			<span>
				<Icon iconName={iconName} />
			</span>
			<span className="ml-2">{title}</span>
		</div>
	);
};

const CategoryActions: FC = () => {
	return (
		<div className="flex items-center">
			<button className="max-w-fit bg-transparent rounded-md hover:bg-slate-400">
				<PlusIcon className="h-5 w-5 text-white" />
			</button>
			<button className="max-w-fit bg-transparent rounded-md hover:bg-slate-400 ml-2">
				<EllipsisHorizontalIcon className="h-5 w-5 text-white" />
			</button>
		</div>
	);
};

export const Category: FC<CategoryProps> = ({ iconName, title, taskList, id }) => {
	return (
		<div className="w-80">
			<div className="flex justify-between items-center mb-2">
				<CategoryInfo iconName={iconName} title={title} />
				<CategoryActions />
			</div>
			<Droppable droppableId={id}>
				{provided => (
					<div className="taskListContainer" ref={provided.innerRef} {...provided.droppableProps}>
						<TaskList taskList={taskList} />
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
};
