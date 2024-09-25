import "./HomePage.css";
// import axios from "axios";
import { useState } from "react";
// import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { login, setToken } from "../../../services/authServices.js";


const HomePage = () => {
  const [dataDNI, setDataDNI] = useState("");
  const [dataPassword, setDataPassword] = useState("");
  // const signIn = useSignIn();
  const navigate = useNavigate();
  

  const loginRequest = async (dataDNI, dataPassword) => {
    const token = await login(dataDNI, dataPassword);
    
    const decodedToken = jwtDecode(token);

    console.log('aca esta el decode token', decodedToken.admin)

    if (token) {
      setToken(token);
    }

    if (decodedToken.Role === 'admin') {
      navigate("/admin");
    } else {
      navigate("/results");
    }

    // axios
    //   .post("http://127.0.0.1:8080/login", {
    //     DNI: parseInt(dataDNI, 10),
    //     Password: dataPassword,
    //   })
    //   .then((response) => {
    //     const token = response.data.token;
    //     const decodedToken = jwtDecode(token)

    //     if (token) {
    //       const signInResult = signIn({
    //         auth: {
    //           token: token,
    //           type: "Bearer",
    //         },
    //         userState: {
    //           name: "User Login",
    //           uid: dataDNI,
    //         },
    //       });

    //       if (signInResult) {
    //         console.log("LOGUEADO CORRECTAMENTE")
    //       } else {
    //         console.log("ERROR AL LOGUEARSE");
    //       }

    //       if(decodedToken.admin){
    //         navigate("/admin")
    //       }else{
    //         navigate("/results")
    //       }

    //     } else {
    //       console.error("No se recibió el token en la respuesta");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("CONTRASEÑA INCORRECTA", error);
    //   });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    loginRequest(dataDNI, dataPassword);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="dni">DNI:</label>
          <input
            type="text"
            id="dni"
            name="dni"
            value={dataDNI}
            onChange={(e) => setDataDNI(e.target.value)}
            required
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={dataPassword}
            onChange={(e) => setDataPassword(e.target.value)}
            required
          />

          <button type="submit">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
