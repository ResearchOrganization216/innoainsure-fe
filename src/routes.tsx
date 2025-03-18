import {
  AddEditRecord,
  Home,
  CustomerRiskManagement,
  Unauthorised,
  PremiumList,
  PremiumAdjustment,
  Login,
  DataExtractionInspectionReport,
} from "./pages";

import { MdDashboard, MdRadio, MdMoney } from "react-icons/md";
import { Navigate } from "react-router-dom";
import DataExtraction from "./pages/Dashboard/Data-Extraction-ClaimReport";
import DataExtractionDriveStatement from "./pages/Dashboard/Data-Extraction-DriverStatement";

const icon = {
  className: "w-6 h-6 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        path: "/",
        element: <Navigate to='/dashboard' replace />,
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
        icon: <MdMoney {...icon} />,
        name: "Premium Management",
        path: "/premium-list",
        element: <PremiumList />,
      },
      {
        icon: <MdRadio {...icon} />,
        name: "Data Extraction Claim Report",
        path: "/document-data-extraction",
        element: <DataExtraction />,
      },
      {
        icon: <MdRadio {...icon} />,
        name: "Data Extraction Driver Statement",
        path: "/document-data-extraction-driver-statement",
        element: <DataExtractionDriveStatement />,
      },
      {
        icon: <MdRadio {...icon} />,
        name: "Data Extraction Inspection Report",
        path: "/document-data-extraction-inspection-report",
        element: <DataExtractionInspectionReport />,
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
        element: <Navigate to='/auth/sign-in' replace />,
      },
      {
        path: "/",
        element: <Navigate to='/auth/sign-in' replace />,
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
        path: "/adjustment/:id",
        element: <PremiumAdjustment />,
      },
    ],
  },
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
