export const TaskPage = () => {
	return (
		<div className="container max-w-full h-[calc(100vh_-_144px)] flex justify-center">
			<div className="w-full sm:w-1/2 max-h-fit p-4 my-auto bg-neutral rounded-md ">
				<form className="flex flex-col space-y-4 align-center min-w-fit">
					<h3>Редактирование задачи</h3>
					<input
						tabIndex={1}
						type="text"
						placeholder="Название задачи"
						className="input w-full "
						required
						name="title"
					/>
					<textarea
						tabIndex={2}
						placeholder="Описание (необязательно)"
						className="textarea textarea-md w-full "
						name="description"
					/>

					<div>
						<label className="label">
							<span className="label-text">Категория</span>
						</label>
						<select tabIndex={3} className="select w-full" required name="categoryId"></select>
					</div>

					<div>
						<label className="label">
							<span className="label-text">Приоритет</span>
						</label>
						<select tabIndex={4} className="select w-full" required name="priority"></select>
					</div>
					<div className="flex justify-end">
						<button tabIndex={6} className="btn max-w-fit rounded-md font-semibold mr-2">
							Отмена
						</button>
						<button tabIndex={5} className="btn bg-green-600 max-w-fit rounded-md font-semibold" type="submit">
							Сохранить
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
