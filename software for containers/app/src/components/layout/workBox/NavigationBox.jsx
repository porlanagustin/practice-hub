import "./NavigationBox.css";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../../../router/menuRoutes";

const WorkBox = () => {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("Inicio");

  useEffect(() => {
    const currentRoute = routes.find(
      (route) => route.path === location.pathname
    );
    if (currentRoute) {
      setPageTitle(
        currentRoute.id.charAt(0).toUpperCase() + currentRoute.id.slice(1)
      );
    } else {
      setPageTitle("Inicio");
    }
  }, [location.pathname]);

  return (
    <div className="nav-navigation-box">
      <div className="nav-navigation-dropdown">
        <button className="nav-navigation-dropbtn">Barra de navegación</button>
        <div className="nav-navigation-dropdown-content">
          {routes.map(route => (
            <Link key={route.id} to={route.path}>
              {route.id.charAt(0).toUpperCase() + route.id.slice(1)}
            </Link>
          ))}
        </div>
      </div>
      <p>{">"}</p>
      <h1>{pageTitle}</h1>
    </div>
  );
};

export default WorkBox;
