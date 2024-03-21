import React, { useState, useCallback, useEffect } from "react";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { NewPlace } from "./places/pages/NewPlace";
import { UpdatePlace } from "./places/pages/UpdatePlace";
import { UserPlaces } from "./places/pages/UserPlaces";
import { MainNavigation } from "./shared/components/Navigation/MainNavigation";
import { Auth } from "./user/pages/Auth";
import { Users } from "./user/pages/Users";
import { AuthContext } from "./shared/context/auth-context";

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

let logoutTimer;

const App = () => {
  const [token, setToken] = useState(null);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token, exporationDate) => {
    setToken(token);
    setUserId(uid);
    const expiration =
      exporationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(expiration);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token,
        expiration: expiration.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (
      userData &&
      userData.token &&
      new Date(userData.expiration) > new Date()
    ) {
      login(userData.userId, userData.token, new Date(userData.expiration));
    }
  }, [login]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, login, logout }}
    >
      <RouterProvider router={token ? loggedInRouter : loggedOutRouter} />
    </AuthContext.Provider>
  );
};

export default App;
