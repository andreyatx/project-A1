import { collection, type DocumentData, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { type FC,useEffect, useState } from 'react';

import { db } from '../firebase';
import { dashboardSelectors } from '../store/features/dashboard/dashboardSlice';
import { dashboardThunks } from '../store/features/dashboard/dashboardThunks';
import { UIActions } from '../store/features/UI/UISlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { Category, type CategoryProps } from './Category';
import { NewTask } from './NewTask';

export const Dashboard: FC = () => {
	const { isLoading } = useAppSelector(dashboardSelectors.all);
	const [categoryList, setCategoryList] = useState<CategoryProps[]>([]);
	const dispatch = useAppDispatch();

	const openModalHandler = () => {
		dispatch(UIActions.openModal());
	};

	useEffect(() => {
		// Get categories once to set store state
		dispatch(dashboardThunks.getCategoryList());

		// Get categories real-time updates
		const categoryListQuery = query(collection(db, 'CATEGORY_LIST'), orderBy('order'), limit(99));
		onSnapshot(categoryListQuery, querySnapshot => {
			const result: DocumentData[] = [];
			querySnapshot.forEach(doc => {
				result.push({ ...doc.data(), id: doc.id });
			});
			setCategoryList(result as CategoryProps[]);
		});
	}, []);

	if (isLoading) {
		return <div className="text-3xl">Загрузка . . .</div>;
	}

	return (
		<>
			<div className="container flex flex-col align-center">
				<NewTask />
				<div className="add-task mb-4">
					<button onClick={openModalHandler} className="btn">
						Создать задачу
					</button>
				</div>
				<div className="flex flex-row space-x-8 ">
					{categoryList.map(category => (
						<Category key={category.id} {...category} />
					))}
				</div>
			</div>
		</>
	);
};
