import { Home, Unauthorised, Login } from "./pages";

import { MdDashboard } from "react-icons/md";
import { Navigate } from "react-router-dom";

const icon = {
  className: "w-6 h-6 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        icon: <MdDashboard {...icon} />,
        name: "Dashboard",
        path: "/dashboard",
        element: <Home />,
      },
    ],
  },
  {
    title: "auth",
    layout: "auth",
    pages: [
      {
        name: "sign-in",
        path: "/sign-in",
        element: <Login />,
      },
      {
        path: "/auth",
        element: <Navigate to="/auth/sign-in" replace />,
      },
      {
        path: "/",
        element: <Navigate to="/auth/sign-in" replace />,
      },
    ],
  },
  // {
  //   layout: "dashboard",
  //   pages: [
  //     {
  //       path: "/not-authorized/403",
  //       element: <Unauthorised />,
  //     },
  //   ],
  // },
  {
    layout: "unauthorised",
    pages: [
      {
        path: "/not-authorized/403",
        element: <Unauthorised />,
      },
    ],
  },
];
