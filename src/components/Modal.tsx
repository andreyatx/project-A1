import { FC, Fragment, ReactNode, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/solid';

type ModalProps = {
	children?: ReactNode;
	openModal?: () => void;
};

export const Modal: FC<ModalProps> = ({ children, openModal }) => {
	let [isOpen, setIsOpen] = useState(true);

	const closeModal = () => {
		setIsOpen(false);
	};

	return (
		<>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
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
										onClick={closeModal}
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
