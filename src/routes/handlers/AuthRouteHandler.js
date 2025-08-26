import { Navigate, Outlet } from "react-router-dom";

const AuthRouteHandler = () => {
  const token = localStorage.getItem("token");

  // If not authenticated, redirect to login page
  if (!token) {
    return <Navigate to="/" />;
  }

  // If authenticated, render the protected route
  return <Outlet />;
};

export default AuthRouteHandler;
