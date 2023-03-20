import './index.css';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Dashboard } from './components/Dashboard';
import { ErrorPage } from './pages/ErrorPage';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { WelcomePage } from './pages/WelcomePage';
import { AuthRoutes } from './routes/AuthRoutes';
import { ProtectedRoutes } from './routes/ProtectedRoutes';
import { Root } from './routes/Root';
import { store } from './store/store';

export enum Paths {
	Home = '/',
	SignIn = '/sign-in',
	SignUp = '/sign-up',
	Dashboard = '/dashboard',
}

const router = createBrowserRouter([
	{
		// path: Paths.Home,
		element: <Root />,
		errorElement: <ErrorPage />,
		children: [
			{
				element: <AuthRoutes />,
				path: Paths.Home,
				errorElement: <ErrorPage />,
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
				],
			},
		],
	},
]);
// const router = createBrowserRouter([
// 	{
// 		path: Paths.Home,
// 		element: <AuthRoutes />,
// 		children: [
// 			{
// 				path: Paths.Dashboard,
// 				element: <Dashboard />,
// 			},
// 		],
// 	},
// ]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
