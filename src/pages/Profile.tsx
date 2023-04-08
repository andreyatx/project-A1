import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { type FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import basedge from '../assets/Basedge.png';
import { Paths } from '../routes/router';

export const Profile: FC = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState<User | undefined>();

	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, user => {
			if (user) {
				console.log(user);
				setUser(user);
			}
		});
	}, []);

	if (!user) {
		return <div className="mx-auto spinner"></div>;
	}
	return (
		<div className="w-full h-screen flex justify-center items-center">
			<form className="min-w-min w-96 bg-neutral flex flex-col p-4 space-y-4 rounded-lg shadow-2xl shadow-black">
				<h2 className="mb-4">Профиль</h2>
				<div className="avatar mx-auto">
					<div className="w-24 rounded-full">
						<img src={basedge} />
					</div>
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Изменить аватар</span>
					</label>
					<input type="file" className="file-input file-input-bordered w-full max-w-xs text-black" />
				</div>
				<div>
					<label className="label">
						<span className="label-text text-lg">Почта</span>
					</label>
					<span>{user.email}</span>
				</div>

				<button className="btn bg-primary">Сохранить</button>
				<button onClick={() => navigate(Paths.Dashboard)} className="btn bg-secondary">
					Отмена
				</button>
			</form>
		</div>
	);
};
