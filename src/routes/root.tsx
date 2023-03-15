import { type FC } from 'react';

import { Dashboard } from '../components/Dashboard';

export const Root: FC = () => {
	return (
		<div className="flex justify-center h-screen w-screen bg-slate-800">
			<Dashboard />
		</div>
	);
};
