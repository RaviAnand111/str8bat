import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import React from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

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
]);

export default router;
