import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Paths } from '../main';

//** Routes available only when logged out */
export const AuthRoutes = () => {
	const auth = getAuth();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const AuthCheck = onAuthStateChanged(auth, user => {
			if (user) {
				setLoading(false);
				navigate(Paths.Dashboard);
			} else {
				console.log('already in system');
			}
		});

		return () => AuthCheck();
	}, [auth]);

	if (loading) return <p>Загрузка ...</p>;
	return (
		<>
			<Outlet />
		</>
	);
};
