import axiosInstance from "../axios/axiosinstance";
import { jwtDecode } from 'jwt-decode';

export const setToken = (token) => {
    localStorage.setItem('token', token)
};

export const getToken = () => {
    const token = localStorage.getItem('token');
    if(token){
        return token;
    }
    return null;
}

export const login = async (dataDNI, dataPassword) => {
    try {
        const response = await axiosInstance.post("/login", {
            DNI: parseInt(dataDNI, 10),
            Password: dataPassword,
        });
        return response?.data?.token
    } catch (error) {
        console.error("Error logging in:", error);
    }
};

export const getUserEmail = () => {
    const token = getToken();
    if(token){
        const payLoad = jwtDecode(token);
        return payLoad?.email
    }

    return null
}

export const getUserRole = () => {
    const token = getToken();
    if(token){
        const payLoad = jwtDecode(token);
        return payLoad?.admin
    }

    return null
}

export const isLoggedIn = () => {
    const token = getToken();
    if(token){
        const payLoad = jwtDecode(token);
        const isLogin = Date.now() < payLoad.exp * 1000;
        return isLogin;
    }
}

export const logOut = () => {
    localStorage.clear();
}

