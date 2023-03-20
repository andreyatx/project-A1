import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { auth } from '../firebase';
import { Paths } from '../main';

type SignUpData = {
	email: string;
	password: string;
	passwordCheck: string;
};

export const SignUp = () => {
	const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpData>({ mode: 'onChange' });

	const onSubmit = ({ email, password }: SignUpData) => {
		console.log(email, password);

		createUserWithEmailAndPassword(auth, email, password)
			.then(userCredential => {
				const user = userCredential.user;
				console.log(user);
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
				className="min-w-min w-72  bg-neutral flex flex-col p-4 space-y-4 rounded-lg shadow-2xl shadow-black max-sm:w-full">
				<h2 className="mb-4">Регистрация</h2>
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
				<div>
					<label className="label">
						<span className="label-text text-lg">Повторите пароль</span>
					</label>
					<input
						{...register('passwordCheck', {
							required: 'Обязательное поле',
							minLength: {
								value: 6,
								message: 'Минимальная длина 6 символов',
							},
							validate: (val: string) => {
								if (watch('password') != val) {
									return 'Пароли не совпадают';
								}
							},
						})}
						tabIndex={3}
						type="password"
						placeholder="Повторите пароль"
						className="input w-full"
					/>
					{errors.passwordCheck && <span className="text-error">{errors.passwordCheck.message}</span>}
				</div>
				<button className="btn bg-primary">Войти</button>
				<Link className="text-white self-center" to={Paths.SignIn}>
					Уже зарегистрированы? Войти
				</Link>
			</form>
		</div>
	);
};
