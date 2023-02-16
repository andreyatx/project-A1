import { type FC } from 'react';

import { categorySelectors } from '../store/features/category/categorySlice';
import { useAppSelector } from '../store/hooks';
import { Category } from './Category';

export const Dashboard: FC = () => {
	const { categories } = useAppSelector(categorySelectors.all);

	return (
		<div className="flex flex-row space-x-8">
			{categories.map(category => (
				<Category key={category.id} {...category} />
			))}
		</div>
	);
};
