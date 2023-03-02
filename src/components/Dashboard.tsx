import { push, ref, set } from 'firebase/database';
import { type FC } from 'react';
import { db } from '../firebase';

import { categorySelectors } from '../store/features/category/categorySlice';
import { useAppSelector } from '../store/hooks';
import { Category } from './Category';
import { Modal } from './Modal';
import { NewCategory } from './NewCategory';

export const Dashboard: FC = () => {
	const { categories } = useAppSelector(categorySelectors.all);
	// const catListRef = ref(db, 'categories');
	// const newCatRef = push(catListRef);

	// set(newCatRef, {
	// 	title: 'Backlog',
	// 	id: 1,
	// });

	return (
		<>
			<Modal />
			<div className="container flex flex-col align-center">
				<div className="actions mb-4"></div>
				<div className="flex flex-row space-x-8 ">
					{categories.map(category => (
						<Category key={category.id} {...category} />
					))}
				</div>
			</div>
		</>
	);
};
