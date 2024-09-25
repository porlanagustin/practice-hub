import React from "react";
import "./DownloadResults.css";
import Navbar from "../../layout/navbar/Navbar";
import Footer from "../../layout/footer/Footer";
import axios from "axios";
import Cookies from "js-cookie";

const DownloadResults = () => {
  const tryProtected = () => {
    const token = Cookies.get("_auth");

    axios
      .get("http://127.0.0.1:8080/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log("NO AUTORIZADO", err);
      });
  };

  const handleClick = (event) => {
    event.preventDefault();
    tryProtected();
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="container">
        <div className="results-table">
          <table>
            <thead>
              <tr>
                <th>Nombre del Estudio</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Información</th>
                <th>Descargar Resultado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ESTUDIO 1</td>
                <td>10/11</td>
                <td>15:30</td>
                <td>NACE EL MEJOR</td>
                <td>
                  <button className="download-button" onClick={handleClick}>
                    Descargar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DownloadResults;
