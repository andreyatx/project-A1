import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { type FC, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Paths } from '../main';

//** Routes available only when logged in */
export const ProtectedRoutes: FC = () => {
	const auth = getAuth();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const logoutHandler = () => {
		signOut(auth)
			.then(() => {
				console.log('logged out');
			})
			.catch(error => {
				console.log(error);
			});
	};

	useEffect(() => {
		const AuthCheck = onAuthStateChanged(auth, user => {
			if (user) {
				setLoading(false);
			} else {
				console.log('unauthorized');
				navigate(Paths.SignIn);
			}
		});

		return () => AuthCheck();
	}, [auth]);

	if (loading) return <p>Загрузка ...</p>;

	return (
		<>
			<div className="navbar bg-neutral">
				<div className="navbar-start">
					<a className="btn btn-ghost normal-case text-xl">Task Manager</a>
				</div>

				<div className="navbar-end">
					<button onClick={logoutHandler} className="btn btn-primary">
						Выйти
					</button>
				</div>
			</div>
			<Outlet />
		</>
	);
};
