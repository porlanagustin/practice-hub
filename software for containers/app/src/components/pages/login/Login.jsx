import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { login, setToken } from "../../../services/authServices.js";

const Login = () => {
  const [dataDNI, setDataDNI] = useState("");
  const [dataPassword, setDataPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // const loginRequest = async (dataDNI, dataPassword) => {
  //   try {
  //     const token = await login(dataDNI, dataPassword);
  //     if (token) {
  //       setToken(token);
  //       const decodedToken = jwtDecode(token);
  //       if (decodedToken.Role === 'admin') {
  //         navigate("/admin");
  //       } else {
  //         navigate("/results");
  //       }
  //     } else {
  //       setError("Credenciales invalidas");
  //     }
  //   } catch (error) {
  //     setError("Error en el servidor");
  //   }
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/gestionPedidos");
  };

  return (
    <div className="login-container">
      {error && <p>{error}</p>}
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

export default Login;
