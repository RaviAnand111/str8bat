import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import React from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import UserProfile from "./pages/UserProfile/UserProfile";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
const router = createBrowserRouter([
    {
        path: "/",
        element: React.createElement(App),
    },
    {
        path: "",
        element: React.createElement(Home),
    },
    {
        path: "/login",
        element: React.createElement(Login),
    },
    {
        path: "/Signup",
        element: React.createElement(SignUp),
    },
    {
        path: "/user/:userId",
        element: React.createElement(UserProfile),
    },
    {
        path: "/verify/email",
        element: React.createElement(VerifyEmail),
    },
]);
export default router;
