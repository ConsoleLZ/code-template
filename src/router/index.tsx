import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from '@/pages/home';
import Error from '@/pages/404';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />
	},
	{
		path: '/404',
		element: <Error />
	},
	{
		path: '*',
		element: <Navigate to="/404" replace />
	}
]);

export default router;
