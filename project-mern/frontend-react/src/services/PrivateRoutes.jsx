import { Navigate } from "react-router-dom";
import { getUserRole } from "./authServices";

const PrivateRoutes = ({ children }) => {

  const pass = getUserRole()

  return pass === 'admin' || pass === 'cliente' ? children : <Navigate to="/" />;
};

export default PrivateRoutes;