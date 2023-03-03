import { EllipsisHorizontalIcon, PlusIcon } from '@heroicons/react/24/solid';
import { type FC, type ReactElement } from 'react';
import { NewTask } from './NewTask';

import { Task, type TaskProps } from './Task';

type CategoryProps = {
	icon: ReactElement;
	title: string;
	taskList?: TaskProps[];
};

const CategoryInfo: FC<CategoryProps> = ({ icon, title }) => {
	return (
		<div className="flex flex-row justify-between items-center">
			<span>{icon}</span>
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

export const Category: FC<CategoryProps> = ({ icon, title }) => {
	return (
		<div className="w-80">
			<div className="flex justify-between items-center mb-2">
				<CategoryInfo icon={icon} title={title} />
				<CategoryActions />
			</div>
			<div className="taskListContainer"></div>
		</div>
	);
};
