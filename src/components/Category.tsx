import { EllipsisHorizontalIcon, PlusIcon } from '@heroicons/react/24/solid';
import { type FC } from 'react';
import { Icon, IconNames } from './Icon';

import { Task, type TaskProps } from './Task';

export type CategoryProps = {
	id: number;
	iconName: string;
	title: string;
	taskList: TaskProps[];
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
	const clickHandler = () => {
		console.log('open modal');
	};

	return (
		<div className="flex items-center">
			<button onClick={clickHandler} className="max-w-fit bg-transparent rounded-md hover:bg-slate-400">
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
			<div className="taskListContainer">
				{taskList.map(task => {
					console.log('cat id', id, title);
					console.log('task cat id', task.category_id);

					if (Number(task.category_id) === id) {
						return <Task key={task.id} {...task} />;
					}
				})}
			</div>
		</div>
	);
};
