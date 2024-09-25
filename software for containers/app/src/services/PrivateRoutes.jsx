import { Navigate } from "react-router-dom";
import { isLoggedIn} from "./authServices";

const PrivateRoutes = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/" />;
};

export default PrivateRoutes;


