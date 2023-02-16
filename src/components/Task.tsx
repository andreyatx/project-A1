import { Avatar } from './Avatar';

export const Task = () => {
	return (
		<div className="card w-80 h-24 bg-neutral rounded-sm flex flex-row p-2 mb-2">
			<div className="left-block">
				<div className="text-sm text-slate-300">Taskid</div>
				<div className="mb-2">Название задачи</div>

				<div className="flex flex-row">
					<div className="text-sm text-slate-300">priority</div>
					<div className="text-sm text-slate-300 ml-2">tags</div>
				</div>
			</div>

			<div className="right-block ml-auto">
				<Avatar />
			</div>
		</div>
	);
};
