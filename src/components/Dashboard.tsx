import { type FC } from 'react';

import { Category } from './Category';

const arr = [1, 2, 3];

export const Dashboard: FC = () => {
	return (
		<div className="flex flex-row space-x-8">
			{arr.map(category => (
				<Category key={category} />
			))}
		</div>
	);
};
