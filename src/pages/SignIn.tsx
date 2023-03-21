import { signInWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { auth } from '../firebase';
import { Paths } from '../routes/router';

type SignInData = {
	email: string;
	password: string;
};

export const SignIn = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignInData>({ mode: 'onChange' });

	const navigate = useNavigate();

	const onSubmit = ({ email, password }: SignInData) => {
		console.log(email, password);

		signInWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				const user = userCredential.user;
				console.log(user);
				navigate(Paths.Dashboard);
			})
			.catch(error => {
				const errorCode = error.code;
				console.log(errorCode);

				const errorMessage = error.message;
				console.log(errorMessage);
			});
	};

	return (
		<div className="w-full h-screen flex justify-center items-center ">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="min-w-min w-72 bg-neutral flex flex-col p-4 space-y-4 rounded-lg shadow-2xl shadow-black lg:w-1/5">
				<h2 className="mb-4">Вход</h2>
				<div>
					<label className="label">
						<span className="label-text text-lg">Почта</span>
					</label>
					<input
						{...register('email', {
							required: 'Обязательное поле',
							pattern: {
								value: /@\w+\./,
								message: 'Некорректный email',
							},
						})}
						tabIndex={1}
						type="email"
						placeholder="Почта"
						className="input w-full"
					/>
					<span className="text-error">{errors.email?.message}</span>
				</div>
				<div>
					<label className="label">
						<span className="label-text text-lg">Пароль</span>
					</label>
					<input
						{...register('password', {
							required: 'Обязательное поле',
							minLength: {
								value: 6,
								message: 'Минимальная длина 6 символов',
							},
						})}
						tabIndex={2}
						type="password"
						placeholder="Пароль"
						className="input w-full"
					/>
					{errors.password && <span className="text-error">{errors.password.message}</span>}
				</div>
				<button className="btn bg-primary">Войти</button>
				<Link className="text-white self-center" to={Paths.SignUp}>
					Нет аккаунта? Регистрация
				</Link>
			</form>
		</div>
	);
};
