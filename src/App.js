import React from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { NewPlace } from "./places/pages/NewPlace";
import { UpdatePlace } from "./places/pages/UpdatePlace";
import { UserPlaces } from "./places/pages/UserPlaces";
import { MainNavigation } from "./shared/components/Navigation/MainNavigation";
import { Auth } from "./user/pages/Auth";
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
				path: "/:userId/places",
				element: <UserPlaces />,
			},
			{
				path: "/places",
				children: [
					{ path: "new", element: <NewPlace /> },
					{ path: ":placeId", element: <UpdatePlace /> },
				],
			},
			{
				path: "/auth",
				element: <Auth />,
			},
			{
				path: "*",
				element: <Users />,
			},
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
