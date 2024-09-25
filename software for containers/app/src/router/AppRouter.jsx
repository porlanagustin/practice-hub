import RouteNotFound from "../components/pages/routeNotFound/RouteNotFound";
import { Route, Routes } from "react-router-dom";
import Login from "../components/pages/login/Login.jsx";
import Layout from "../components/layout/Layout.jsx";
import { routes } from "./menuRoutes.js";
// import AdminPrivateRoute from "../services/AdminPrivateRoute.jsx";
// import PrivateRoutes from "../services/PrivateRoutes.jsx";

const mainRoutes = routes.map(({ id, path, Element }) => (
  <Route key={id} path={path} element={<Element />} />
));

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<Layout></Layout>}>{mainRoutes}</Route>
      <Route path="*" element={<RouteNotFound />} />
    </Routes>
  );
};

export default AppRouter;
