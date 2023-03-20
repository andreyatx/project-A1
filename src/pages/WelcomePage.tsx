import { type FC } from 'react';
import { Link } from 'react-router-dom';

import { Paths } from '../main';

export const WelcomePage: FC = () => {
	return (
		<div className="hero min-h-screen bg-neutral">
			<div className="hero-content text-center  shadow-2xl shadow-black">
				<div className="max-w-md">
					<h1 className="text-5xl font-bold">Task Manager</h1>
					<p className="py-6">Войдите или создайте аккаунт, чтобы продолжить</p>
					<div className="flex flex-col space-y-3">
						<Link className="btn btn-primary" to={Paths.SignIn}>
							Войти
						</Link>
						<Link className="btn btn-secondary" to={Paths.SignUp}>
							Регистрация
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
