import {
  MdDashboard,
  MdEditDocument,
  MdMoney,
  MdOpenInBrowser,
  MdRadio,
  MdTireRepair,
} from "react-icons/md";
import { Navigate, Outlet } from "react-router-dom";
import {
  ClaimManagement,
  CustomerRiskManagement,
  DataExtractionInspectionReport,
  EstimationCrossChecking,
  Home,
  Login,
  PremiumAdjustment,
  PremiumList,
  Unauthorised,
  ViewClaim,
  ViewEstimation,
} from "./pages";
import DataExtraction from "./pages/Dashboard/Data-Extraction-ClaimReport";
import DataExtractionDriveStatement from "./pages/Dashboard/Data-Extraction-DriverStatement";

const icon = {
  className: "w-6 h-6 text-inherit",
};

// This layout provides an Outlet for Document Management child routes.
const DocumentManagementLayout = () => <Outlet />;

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
        icon: <MdTireRepair {...icon} />,
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
      // Document Management nested under /dashboard
      {
        icon: <MdEditDocument {...icon} />,
        name: "Document Management",
        path: "/document-management/",
        element: <DocumentManagementLayout />,
        children: [
          {
            icon: <MdOpenInBrowser {...icon} />,
            name: "Data Extraction Claim Report",
            // Relative path appended to the parent's path:
            path: "document-data-extraction",
            element: <DataExtraction />,
          },
          {
            icon: <MdOpenInBrowser {...icon} />,
            name: "Data Extraction Driver Statement",
            path: "document-data-extraction-driver-statement",
            element: <DataExtractionDriveStatement />,
          },
          {
            icon: <MdOpenInBrowser {...icon} />,
            name: "Data Extraction Inspection Report",
            path: "document-data-extraction-inspection-report",
            element: <DataExtractionInspectionReport />,
          },
        ],
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
      {
        path: "/premium-list/adjustment/:id",
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
    ],
  },
];
