import React from "react";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { NewPlace } from "./places/pages/NewPlace";
import { UpdatePlace } from "./places/pages/UpdatePlace";
import { UserPlaces } from "./places/pages/UserPlaces";
import { Auth } from "./user/pages/Auth";
import { Users } from "./user/pages/Users";

import { MainNavigation } from "./shared/components/Navigation/MainNavigation";

import { AuthContext } from "./shared/context/auth-context";

import { useAuth } from "./shared/hooks/auth-hook";

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

const loggedOutRouter = createBrowserRouter([
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
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "*",
        element: <Navigate to="/auth" replace />,
      },
    ],
  },
]);

const loggedInRouter = createBrowserRouter([
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
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

const App = () => {
  const { login, logout, token, userId } = useAuth();
  
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}
    >
      <RouterProvider router={token ? loggedInRouter : loggedOutRouter} />
    </AuthContext.Provider>
  );
};

export default App;
