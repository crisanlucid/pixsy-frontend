import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const location = useLocation();
  const loginCtx = { isLogin: true };

  return loginCtx.isLogin ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ from: location }} // <-- current location so login can redirect back is desired
    />
  );
};

export default AuthLayout;
