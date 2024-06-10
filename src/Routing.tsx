import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, UsersList, UserDetails } from "./pages";
export const HOME_PATH = "/";
export const USERS_PATH = "/users";
export const USER_DETAILS_PATH = "/users/:id";

const routes = [
  {
    component: Home,
    path: HOME_PATH,
  },
  {
    component: UsersList,
    path: USERS_PATH,
  },
  {
    component: UserDetails,
    path: USER_DETAILS_PATH,
  },
];

const Routing = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} path={route.path} Component={route.component} />
      ))}
    </Routes>
  );
};

export default Routing;
