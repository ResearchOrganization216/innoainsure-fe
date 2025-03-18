import { routes } from "@/routes";
import "primeicons/primeicons.css";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";

const Auth: FC = () => {
  return (
    <div className="relative min-h-screen w-full">
      <Routes>
        {routes.map(
          ({ layout, pages }) =>
            layout === "auth" &&
            pages.map(({ path, element }) => (
              <Route path={path} element={element} />
            ))
        )}
      </Routes>
    </div>
  );
};

export default Auth;
