import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { type FC, Fragment, type ReactNode } from 'react';

import { UIActions, UISelectors } from '../store/features/UI/UISlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

type ModalProps = {
	children?: ReactNode;
};

export const Modal: FC<ModalProps> = ({ children }) => {
	const { isModalOpen } = useAppSelector(UISelectors.all);
	const dispatch = useAppDispatch();

	const closeModalHandler = () => {
		dispatch(UIActions.closeModal());
	};

	return (
		<>
			<Transition appear show={isModalOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModalHandler}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95">
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-neutral p-6 text-left align-middle shadow-xl transition-all">
									<button
										tabIndex={999}
										onClick={closeModalHandler}
										className="btn btn-square btn-sm btn-outline bg-slate-800 flex ml-auto">
										<XMarkIcon className="h-6 w-6 text-white" />
									</button>
									{children}
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};
