import './index.css';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ErrorPage } from './pages/ErrorPage';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { Root } from './routes/root';
import { store } from './store/store';

export enum Paths {
	Home = '/',
	SignIn = '/sign-in',
	SignUp = '/sign-up',
}

const router = createBrowserRouter([
	{
		path: Paths.Home,
		element: <Root />,
		errorElement: <ErrorPage />,
	},
	{
		path: Paths.SignIn,
		element: <SignIn />,
	},
	{
		path: Paths.SignUp,
		element: <SignUp />,
	},
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
