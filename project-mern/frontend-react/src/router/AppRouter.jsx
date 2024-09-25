import RouteNotFound from "../components/pages/routeNotFound/RouteNotFound";
import { Route, Routes } from "react-router-dom";
import DownloadResults from "../components/pages/downloadResults/DownloadResults.jsx";
import HomePage from "../components/pages/homePage/HomePage.jsx";
import Admin from "../components/pages/admin/Admin.jsx";
import AdminPrivateRoute from "../services/AdminPrivateRoute.jsx";
import PrivateRoutes from "../services/PrivateRoutes.jsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path={"/"} element={<HomePage></HomePage>}></Route>
      <Route
        path={"/results"}
        element={<PrivateRoutes><DownloadResults></DownloadResults></PrivateRoutes>}
      ></Route>
      <Route path={"/admin"} element={<AdminPrivateRoute><Admin></Admin></AdminPrivateRoute>}></Route>
      <Route path="*" element={<RouteNotFound></RouteNotFound>}></Route>
    </Routes>
  );
};

export default AppRouter;
