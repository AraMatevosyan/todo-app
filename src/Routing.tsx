import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Home = lazy(() => import("./pages/Home/Home"));
const UsersList = lazy(() => import("./pages/UsersList/UsersList"));
const UserDetails = lazy(() => import("./pages/UserDetails/UserDetails"));
export const HOME_PATH = "/";
export const USERS_PATH = "/users";
export const USER_DETAILS_PATH = "/users/:id";

const Routing = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={HOME_PATH} element={<Home />} />
        <Route path={USERS_PATH} element={<UsersList />} />
        <Route path={USER_DETAILS_PATH} element={<UserDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default Routing;
