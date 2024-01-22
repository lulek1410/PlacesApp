import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { NewPlace } from "./places/pages/NewPlace";
import { MainNavigation } from "./shared/components/Navigation/MainNavigation";
import { Users } from "./user/pages/Users";

const Layout = () => {
	return (
		<>
			<MainNavigation />
			<main>
				<Outlet />
			</main>
		</>
	);
};

const router = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Users />,
			},
			{
				path: "/places/new",
				element: <NewPlace />,
			},
		],
	},
	{
		path: "*",
		element: <Users />,
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
