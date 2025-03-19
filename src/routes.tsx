import {
  ClaimManagement,
  CustomerRiskManagement,
  DataExtractionInspectionReport,
  EstimationCrossChecking,
  Home,
  Login,
  PremiumAdjustment,
  Unauthorised,
  ViewClaim,
  ViewEstimation,
} from "./pages";

import { MdDashboard, MdRadio } from "react-icons/md";
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
        name: "Premium Adjustment",
        path: "/premium-adjustment",
        element: <PremiumAdjustment />,
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
      {
        icon: <MdRadio {...icon} />,
        name: "Claim Management",
        path: "/claim-management",
        element: <ClaimManagement />,
      },
      {
        icon: <MdRadio {...icon} />,
        name: "Estimation Cross-Checking",
        path: "/estimation-crosschecking",
        element: <EstimationCrossChecking />,
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
  {
    layout: "dashboard",
    pages: [
      {
        path: "/not-authorized/403",
        element: <Unauthorised />,
      },
      {
        path: "/claim-management/view-record",
        element: <ViewClaim />,
      },
      {
        path: "/estimation-crosschecking/view-record",
        element: <ViewEstimation />,
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
    ],
  },
];
