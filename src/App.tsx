import { type FC } from 'react';

import { Dashboard } from './components/Dashboard';
import { NewTask } from './components/NewTask';

export const App: FC = () => {
	return (
		<div className="flex justify-center h-screen w-screen bg-slate-800">
			<Dashboard />
		</div>
	);
};
