import "./Admin.css";
import axios from "axios";
import { useState } from "react";

const Admin = () => {
  const [userData, setUserData] = useState({
    DNI: "",
    Name: "",
    Phone: "",
    Address: "",
    Email: "",
    User: "",
    Password: "",
    Role: "cliente", // Establece un valor predeterminado
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(name, value)

    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dniNumber = parseInt(userData.DNI);
      const userDataToSend = { ...userData, DNI: dniNumber };
      const response = await axios.post(
        "http://127.0.0.1:8080/register",
        userDataToSend
      );
      console.log("Usuario registrado:", response.data);

      console.log(userData);
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Registro de Usuario</h2>
        <div className="form-group">
          <label htmlFor="DNI">DNI:</label>
          <input
            type="number"
            id="DNI"
            name="DNI"
            value={userData.DNI}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Name">Nombre:</label>
          <input
            type="text"
            id="Name"
            name="Name"
            value={userData.Name}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Phone">Teléfono:</label>
          <input
            type="text"
            id="Phone"
            name="Phone"
            value={userData.Phone}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Address">Dirección:</label>
          <input
            type="text"
            id="Address"
            name="Address"
            value={userData.Address}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Email">Email:</label>
          <input
            type="email"
            id="Email"
            name="Email"
            value={userData.Email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="User">Usuario:</label>
          <input
            type="text"
            id="User"
            name="User"
            value={userData.User}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Password">Contraseña:</label>
          <input
            type="password"
            id="Password"
            name="Password"
            value={userData.Password}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="Role">Selecciona un rol:</label>
          <select
            id="Role"
            name="Role"
            value={userData.Role}
            onChange={handleChange}
            className="form-control"
          >
            <option value="admin">Admin</option>
            <option value="cliente">Cliente</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Admin;
