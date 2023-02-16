import { EllipsisHorizontalIcon, PlusIcon } from '@heroicons/react/24/solid';

import { Task } from './Task';

const arr = [1, 2, 3, 4];

const CategoryInfo = () => {
	return (
		<div className="flex flex-row justify-between items-center">
			<span>0</span>
			<span className="ml-2">BACKLOG</span>
			<span className="ml-2">8</span>
		</div>
	);
};

const CategoryActions = () => {
	return (
		<div className="items-center">
			<button className="max-w-fit bg-transparent rounded-md hover:bg-slate-400">
				<PlusIcon className="h-5 w-5 text-white" />
			</button>
			<button className="max-w-fit bg-transparent rounded-md hover:bg-slate-400 ml-2">
				<EllipsisHorizontalIcon className="h-5 w-5 text-white" />
			</button>
		</div>
	);
};

export const Category = () => {
	return (
		<div className="w-80">
			<div className="flex justify-between items-center mb-2">
				<CategoryInfo />
				<CategoryActions />
			</div>
			<div className="taskListContainer">
				{arr.map(task => (
					<Task key={task} />
				))}
			</div>
		</div>
	);
};
