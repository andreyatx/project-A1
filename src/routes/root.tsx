import { signOut } from 'firebase/auth';
import { type FC } from 'react';
import { Outlet } from 'react-router-dom';

import { auth } from '../firebase';

export const Root: FC = () => {
	// const logoutHandler = () => {
	// 	signOut(auth)
	// 		.then(() => {
	// 			console.log('logged out');
	// 		})
	// 		.catch(error => {
	// 			console.log(error);
	// 		});
	// };
	return (
		<>
			{/* <div className="navbar bg-neutral">
				<div className="navbar-start">
					<a className="btn btn-ghost normal-case text-xl">Task Manager</a>
				</div>

				<div className="navbar-end">
					<button onClick={logoutHandler} className="btn btn-primary">
						Выйти
					</button>
				</div>
			</div> */}
			<Outlet />
		</>
	);
};
