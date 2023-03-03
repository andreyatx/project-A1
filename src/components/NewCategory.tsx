import { Modal } from './Modal';

export const NewCategory = () => {
	return (
		<Modal>
			<form>
				<input type="text" placeholder="Название категории" className="input w-full max-w-xs" />
				<input type="text" placeholder="Type here" className="input w-full max-w-xs" />
				<input type="text" placeholder="Type here" className="input w-full max-w-xs" />
				<input type="text" placeholder="Type here" className="input w-full max-w-xs" />
			</form>
		</Modal>
	);
};
