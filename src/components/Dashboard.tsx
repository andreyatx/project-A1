import { type FC } from 'react';

import { dashboardSelectors } from '../store/features/dashboard/dashboardSlice';
import { useAppSelector } from '../store/hooks';
import { Category } from './Category';
import { NewTask } from './NewTask';

export const Dashboard: FC = () => {
	const { categories } = useAppSelector(dashboardSelectors.all);

	return (
		<>
			<div className="container flex flex-col align-center">
				<NewTask />
				<div className="flex flex-row space-x-8 ">
					{categories.map(category => (
						<Category key={category.id} {...category} />
					))}
				</div>
			</div>
		</>
	);
};
