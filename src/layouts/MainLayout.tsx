import { FC } from "react";
import { Outlet } from "react-router-dom";

export const MainLayout: FC = () => {
  return (
    <div className="container">
      <div className="main">
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
