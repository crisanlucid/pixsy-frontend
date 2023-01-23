import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
  const hasAuthorisation = true;

  return hasAuthorisation ? <Outlet /> : <Navigate to="/login" replace />;
};
