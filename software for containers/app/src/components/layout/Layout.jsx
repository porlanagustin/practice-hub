import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import NavigationBox from "./workBox/NavigationBox";
import { Outlet } from "react-router-dom";


const Layout = () => {
    return (
        <>
        <Navbar></Navbar>
        <NavigationBox></NavigationBox>
        <Outlet></Outlet>
        <Footer></Footer>
        </>
    );
    }

export default Layout;