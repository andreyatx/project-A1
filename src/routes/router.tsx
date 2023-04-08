import { createBrowserRouter } from 'react-router-dom';

import { Dashboard } from '../pages/Dashboard';
import { ErrorPage } from '../pages/ErrorPage';
import { Profile } from '../pages/Profile';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { TaskPage } from '../pages/TaskPage';
import { WelcomePage } from '../pages/WelcomePage';
import { AuthRoutes } from './AuthRoutes';
import { ProtectedRoutes } from './ProtectedRoutes';
import { Root } from './root';

export enum Paths {
	Home = '/',
	SignIn = '/sign-in',
	SignUp = '/sign-up',
	Dashboard = '/dashboard',
	Task = '/category/:categoryid/task/:taskid',
	Profile = '/profile',
}

export const router = createBrowserRouter([
	{
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				element: <AuthRoutes />,
				path: Paths.Home,
				children: [
					{
						path: Paths.Home,
						element: <WelcomePage />,
					},
					{
						path: Paths.SignIn,
						element: <SignIn />,
					},
					{
						path: Paths.SignUp,
						element: <SignUp />,
					},
				],
			},
			{
				element: <ProtectedRoutes />,
				path: Paths.Home,
				children: [
					{
						path: Paths.Dashboard,
						element: <Dashboard />,
					},
					{
						path: Paths.Task,
						element: <TaskPage />,
					},
					{
						path: Paths.Profile,
						element: <Profile />,
					},
				],
			},
		],
	},
]);
