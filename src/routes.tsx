import {
  AddEditRecord,
  Home,
  CustomerRiskManagement,
  Unauthorised,
  Login,
} from "./pages";

import { MdDashboard, MdRadio } from "react-icons/md";
import { Navigate } from "react-router-dom";
import DataExtraction from "./pages/Dashboard/Data-Extraction-ClaimReport";

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
      {
        icon: <MdRadio {...icon} />,
        name: "Risk Management",
        path: "/customer-risk-management",
        element: <CustomerRiskManagement />,
      },
      {
        icon: <MdRadio {...icon} />,
        name: "Data Extraction",
        path: "/document-data-extraction",
        element: <DataExtraction />,
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
      {
        path: "/customer-risk-management/add-record",
        element: <AddEditRecord />,
      },
    ],
  },
];
