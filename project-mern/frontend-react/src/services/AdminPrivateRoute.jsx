import { Navigate } from "react-router-dom";
import { getUserRole } from "./authServices";

const AdminPrivateRoute = ({ children }) => {
  return getUserRole() === true ? children : <Navigate to="/" />;
};

export default AdminPrivateRoute;


