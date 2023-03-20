import { onAuthStateChanged } from 'firebase/auth';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import { auth } from '../firebase';
import { Paths } from '../main';
import { authActions } from '../store/features/auth/authSlice';
import { useAppDispatch } from '../store/hooks';

export const AuthRoutes = () => {
	const dispatch = useAppDispatch();
	onAuthStateChanged(auth, user => {
		if (user) {
			console.log(user);

			// dispatch(authActions.setUser(user));
		} else {
			console.log(null);
			// dispatch(authActions.setUser(null));
		}
	});
	return (
		<>
			<Outlet />
		</>
	);
};
