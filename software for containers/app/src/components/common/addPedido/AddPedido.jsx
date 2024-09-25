import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "./AddPedido.css";

const AddPedido = () => {
  const [formData, setFormData] = useState({
    cliente: "",
    direccionEntrega: "",
    estado: "",
    fechaPedido: "",
    fechaEntrega: "",
    idPedido: "",
    tipoContenedor: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formatDate = (dateString) => {
      const [year, month, day] = dateString.split("-");
      return `${day}-${month}-${year}`;
    };

    const newFormData = {
      ...formData,
      fechaPedido: formatDate(formData.fechaPedido),
      fechaEntrega: formatDate(formData.fechaEntrega),
    };

    try {
      await axios.post("http://127.0.0.1:8080/addPedido/v1", newFormData);

      Swal.fire({
        icon: "success", 
        title: `Pedido numero ${formData.idPedido} agregado`,
        text: "El pedido se ha agregado correctamente",
      });
      setError("");
    } catch (error) {
      if (error.response.status === 400) {
        setError(
          `ERROR: ${error.response.data} Ingrese un numero de pedido diferente.`
        );
      } else {
        setError(
          "ERROR: No se pudo agregar el pedido. Contactar al administrador"
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formAddPedido">
      <div className="form-group">
        <label htmlFor="cliente">Cliente</label>
        <input
          type="text"
          id="cliente"
          name="cliente"
          className="form-control"
          value={formData.cliente}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="direccionEntrega">Dirección de Entrega</label>
        <input
          type="text"
          id="direccionEntrega"
          name="direccionEntrega"
          className="form-control"
          value={formData.direccionEntrega}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="estado">Estado</label>
        <select
          id="estado"
          name="estado"
          className="form-control"
          value={formData.estado}
          onChange={handleChange}
        >
          <option value="Solicitado">Solicitado</option>
          <option value="Entregado">Entregado</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="fechaPedido">Fecha de Pedido</label>
        <input
          type="date"
          id="fechaPedido"
          name="fechaPedido"
          className="form-control"
          value={formData.fechaPedido}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fechaEntrega">Fecha de Entrega</label>
        <input
          type="date"
          id="fechaEntrega"
          name="fechaEntrega"
          className="form-control"
          value={formData.fechaEntrega}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="tipoContenedor">Estado</label>
        <select
          id="tipoContenedor"
          name="tipoContenedor"
          className="form-control"
          value={formData.tipoContenedor}
          onChange={handleChange}
        >
          <option value="3m-3">3m-3</option>
          <option value="5m-3">5m-3</option>
          <option value="6m-3">6m-3</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="idPedido">Numero del pedido</label>
        <input
          type="text"
          id="idPedido"
          name="idPedido"
          className="form-control"
          value={formData.idPedido}
          onChange={handleChange}
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button type="submit" className="btn btn-primary">
        Agregar Pedido
      </button>
    </form>
  );
};

export default AddPedido;
