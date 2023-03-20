import { collection, type DocumentData, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { type FC, useEffect, useState } from 'react';
import { DragDropContext, type DropResult } from 'react-beautiful-dnd';

import { Category, type CategoryProps } from '../components/Category';
import { NewTask } from '../components/NewTask';
import { type TaskItem } from '../components/Task';
import { db } from '../firebase';
import { dashboardSelectors } from '../store/features/dashboard/dashboardSlice';
import { dashboardThunks } from '../store/features/dashboard/dashboardThunks';
import { UIActions } from '../store/features/UI/UISlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { moveItemInArray } from '../utils/moveItemInArray';

export const Dashboard: FC = () => {
	const { isLoading } = useAppSelector(dashboardSelectors.all);
	const [categoryList, setCategoryList] = useState<CategoryProps[]>([]);
	const dispatch = useAppDispatch();

	const openModalHandler = () => {
		dispatch(UIActions.openModal());
	};

	const onDragEndHandler = (result: DropResult) => {
		const { destination, source } = result;

		if (!destination) return;

		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		const sourceCategoryIndex = categoryList.findIndex(category => category.id === source.droppableId);
		const sourceCategory = categoryList[sourceCategoryIndex];

		const destinationCategoryIndex = categoryList.findIndex(category => category.id === destination.droppableId);
		const destinationCategory = categoryList[destinationCategoryIndex];

		if (sourceCategoryIndex === destinationCategoryIndex) {
			// Move in the same category
			let newTaskArray: TaskItem[] = [];

			newTaskArray = [...sourceCategory.taskList];

			moveItemInArray(newTaskArray, source.index, destination.index);

			sourceCategory.taskList = newTaskArray;

			const newCategoryList = [...categoryList];

			setCategoryList(newCategoryList);
		} else {
			// Move to a different category
			const sourceTaskArray: TaskItem[] = [...sourceCategory.taskList];
			const [movedItem] = sourceTaskArray.splice(source.index, 1);
			sourceCategory.taskList = sourceTaskArray;

			const destinationTaskArray: TaskItem[] = [...destinationCategory.taskList];

			destinationTaskArray.splice(destination.index, 0, movedItem);
			destinationCategory.taskList = destinationTaskArray;

			const newCategoryList = [...categoryList];
			setCategoryList(newCategoryList);
		}

		dispatch(dashboardThunks.postCategoryList(categoryList));
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
		<DragDropContext onDragEnd={onDragEndHandler}>
			<div className="container flex flex-col align-center">
				<NewTask />
				<div className="add-task mb-4">
					<button onClick={openModalHandler} className="btn btn-primary">
						Создать задачу
					</button>
				</div>
				<div className="flex flex-row space-x-8 ">
					{categoryList.map(category => (
						<Category key={category.id} {...category} />
					))}
				</div>
			</div>
		</DragDropContext>
	);
};
