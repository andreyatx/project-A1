import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { type FC, useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

import { dashboardThunks } from '../store/features/dashboard/dashboardThunks';
import { useAppDispatch } from '../store/hooks';
import { Paths } from './router';

//** Routes available only when logged in */
export const ProtectedRoutes: FC = () => {
	const auth = getAuth();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
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
				// Get categories once to set store state
				dispatch(dashboardThunks.getCategoryList());
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
					<Link to={Paths.Home} className="btn btn-ghost normal-case text-xl hidden sm:flex">
						Task Manager
					</Link>
				</div>

				<div className="navbar-end">
					<button onClick={() => navigate(Paths.Profile)} className="btn btn-primary mr-2">
						Мой профиль
					</button>
					<button onClick={logoutHandler} className="btn btn-secondary">
						Выйти
					</button>
				</div>
			</div>
			<Outlet />
		</>
	);
};
