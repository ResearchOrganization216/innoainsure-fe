import ArrowDown from "@/assets/sidemenu-icons/down-arrow.svg?react";
import ArrowRight from "@/assets/sidemenu-icons/right-arrow.svg?react";
import { routes } from "@/routes";
import useSidebarStore from "@/stores/SidebarStore";
import React, { FC, useState } from "react";
import { NavLink } from "react-router-dom";

const Sidenav: FC = () => {
  const { isExpanded, toggleSidebar } = useSidebarStore();
  const [openSubMenus, setOpenSubMenus] = useState({});
  //const { Roles } = useAuthStore((state) => state.user) || {};

  const toggleSubMenu = (key) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isAdmin = true;

  const excludedPaths = ["/sign-in", "/sign-up", "/", "/not-authorized"];

  const filteredRoutes = (routes as any)
    .filter(({ title, pages }) => {
      if (title === "auth") {
        return !pages.some((page) => excludedPaths.includes(page.path));
      }
      return true;
    })
    .map(({ layout, title, pages }, key) => {
      const regexExcludedPaths = excludedPaths.map(
        (path) => new RegExp("^" + path.replace(/:\w+/g, "[^/]+") + "$")
      );

      // Filter pages based on excluded paths and admin-only status
      const filteredPages = pages.filter(
        (page) =>
          !regexExcludedPaths.some((regex) => regex.test(page.path)) &&
          (!page.adminOnly || isAdmin)
      );

      return {
        layout,
        title,
        pages: filteredPages,
        key,
      };
    });

  return (
    <>
      {isExpanded && (
        <div
          className="fixed inset-0 z-20 lg:hidden"
          onClick={toggleSidebar}
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        />
      )}
      <div
        className={`fixed  left-0 z-30 transform ${
          isExpanded ? "translate-x-0 " : "-translate-x-full lg:translate-x-0"
        } lg:transition-width  ${
          isExpanded ? "w-3/4 md:w-[30%] lg:w-[250px]" : "md:w-[64px]"
        }  bg-primary-blue py-9 duration-100 `}>
        {filteredRoutes.map(({ layout, pages }, key) => (
          <ul
            key={key}
            className="flex max-h-[calc(100%-85px)] min-h-screen flex-col  gap-1 overflow-y-auto ">
            {(pages as any).map(({ icon, name, path, children }, key) => (
              <React.Fragment key={key}>
                <li onClick={() => children && toggleSubMenu(name)}>
                  <NavLink
                    to={layout === "dashboard" ? `/dashboard${path}` : path}>
                    {({ isActive }) => (
                      <div
                        className={`flex items-center ${
                          isActive && "bg-primary-orangeLight"
                        } px-4 py-5 text-sm text-white hover:bg-primary-orangeLight`}>
                        <div className="mr-4">{icon}</div>
                        {isExpanded && name}
                        {children &&
                          (openSubMenus[name] ? (
                            <ArrowDown className="ml-auto" />
                          ) : (
                            <ArrowRight className="ml-auto" />
                          ))}
                      </div>
                    )}
                  </NavLink>
                </li>
                {children && openSubMenus[name] && (
                  <div className="-mt-1 bg-primary-darkBlue ">
                    <ul className=" relative ml-6 border-l border-secondary-gray  py-2 ">
                      {children.map((child) => (
                        <li key={child.name}>
                          <NavLink
                            to={
                              layout === "dashboard"
                                ? `/dashboard${child.path}`
                                : child.path
                            }>
                            {({ isActive }) => (
                              <div
                                className={`flex items-center rounded-sm ${
                                  isActive
                                    ? "text-white"
                                    : "text-secondary-gray"
                                }  py-3 text-sm  hover:text-white`}>
                                <div className="mr-3">{child.icon}</div>
                                {child.name}
                              </div>
                            )}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </React.Fragment>
            ))}
          </ul>
        ))}
      </div>
    </>
  );
};

Sidenav.displayName = "Sidenav";
export default Sidenav;
