import SignoutModal from "@/components/SignoutModal";
import { routes } from "@/routes";
import useAuthStore from "@/stores/authStore";
import useSidebarStore from "@/stores/SidebarStore";
import "primeicons/primeicons.css";
import { FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./Footer";
import Sidenav from "./Sidenav";
import Topbar from "./Topbar";

const Dashboard: FC = () => {
  const { isExpanded } = useSidebarStore();
  const location = useLocation();
  const { pathname } = location;
  const setIsSignOutVisible = useAuthStore(
    (state: any) => state.setIsSignOutVisible
  );
  const isSignOutVisible = useAuthStore((state: any) => state.isSignOutVisible);
  return (
    <>
      <Topbar />
      <div className="relative flex min-h-[97vh] flex-row pt-[85px]">
        <Sidenav />
        <div
          className={`flex w-full flex-grow flex-col ${
            pathname === "/dashboard/summary-dashboard"
              ? "bg-primary-lightGray"
              : "bg-white"
          } ${isExpanded ? "pl-[242px]" : "lg:pl-16"}`}
        >
          <div className="px-8">
            <Routes>
              {routes.map(
                ({ layout, pages }) =>
                  layout === "dashboard" &&
                  pages.map((page: any) => {
                    if (!page.children) {
                      return (
                        <Route
                          path={page.path}
                          element={page.element}
                          key={page.path}
                        />
                      );
                    }
                    return (
                      // Outlets
                      <Route
                        path={page.path}
                        element={page.element}
                        key={page.path}
                      >
                        {page?.children.map((childRoute) => (
                          <Route
                            path={childRoute.path}
                            element={childRoute.element}
                            key={childRoute.path}
                          />
                        ))}
                      </Route>
                    );
                  })
              )}
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
      <SignoutModal
        visible={isSignOutVisible}
        setVisible={setIsSignOutVisible}
      />
    </>
  );
};
Dashboard.displayName = "DLayout";

export default Dashboard;
