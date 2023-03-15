import { Link } from 'react-router-dom';

import { Paths } from '../main';

export const SignUp = () => {
	return (
		<div className="w-full h-screen flex justify-center items-center ">
			<form className="min-w-min w-1/5 bg-neutral flex flex-col p-4 space-y-4 rounded-lg shadow-2xl shadow-black max-sm:w-full">
				<h2 className="mb-4">Регистрация</h2>
				<div>
					<label className="label">
						<span className="label-text text-lg">Логин</span>
					</label>
					<input tabIndex={1} type="text" placeholder="Логин" className="input w-full" required name="login" />
				</div>
				<div>
					<label className="label">
						<span className="label-text text-lg">Пароль</span>
					</label>
					<input tabIndex={2} type="password" placeholder="Пароль" className="input w-full" required name="password" />
				</div>
				<div>
					<label className="label">
						<span className="label-text text-lg">Повторите пароль</span>
					</label>
					<input
						tabIndex={3}
						type="password"
						placeholder="Повторите пароль"
						className="input w-full"
						required
						name="password"
					/>
				</div>
				<button className="btn bg-primary">Войти</button>
				<Link className="text-white self-center" to={Paths.SignIn}>
					Уже зарегистрированы? Войти
				</Link>
			</form>
		</div>
	);
};
