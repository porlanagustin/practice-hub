import { Navigate } from "react-router-dom";
import { isLoggedIn, getUserRole } from "./authServices";

const AdminPrivateRoute = ({ children }) => {
  return isLoggedIn() && getUserRole() === 'admin' ? children : <Navigate to="/" />;
};

export default AdminPrivateRoute;


