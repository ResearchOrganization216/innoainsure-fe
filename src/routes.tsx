import {
  AddEditRecord,
  Home,
  CustomerRiskManagement,
  Unauthorised,
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
    layout: "dashboard",
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
