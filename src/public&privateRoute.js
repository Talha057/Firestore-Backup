import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return token ? <Outlet /> : <Navigate to="/" />;
};
const PublicRoute = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return !token ? <Outlet /> : <Navigate to="/managebackup" />;
};
export { PublicRoute, PrivateRoute };
