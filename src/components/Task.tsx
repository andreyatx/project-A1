import { type FC } from 'react';

import { Avatar } from './Avatar';

export type TaskProps = {
	id: number;
	category_id: number;
	title: string;
	description: string;
	priority: string;
	tags: string;
	avatar?: string;
};

export const Task: FC<TaskProps> = ({ title, priority, tags, avatar }) => {
	return (
		<div className="card w-80 h-24 bg-neutral rounded-sm flex flex-row p-2 mb-2">
			<div className="left-block flex flex-col">
				<div className="mb-2">{title ?? 'Название задачи'}</div>

				<div className="flex flex-row mt-auto">
					<div className="text-sm text-slate-300">Приоритет {priority ?? 'Priority'}</div>
					<div className="text-sm text-slate-300 ml-2">{tags ?? 'Tags'}</div>
				</div>
			</div>

			<div className="right-block ml-auto">
				<Avatar avatar={avatar} />
			</div>
		</div>
	);
};
