import { useState } from "react";
import "../deletePedido/DeletePedido.css";
import axios from "axios";
import Swal from "sweetalert2";

const DeletePedido = () => {
  const [idPedido, setidPedido] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.delete("http://127.0.0.1:8080/deletePedido/v1", {
        data: { idPedido },
      });
      setError("");
      Swal.fire({
        icon: "success",
        title: `Pedido numero ${formData.idPedido} eliminado`,
        text: "El pedido se ha eliminado correctamente",
      });
    } catch (error) {
      if (error.response.status === 400) {
        setError(
          `ERROR: ${error.response.data}. Ingrese un numero de pedido diferente.`
        );
      } else {
        setError("ERROR: No se pudo eliminar. Contactar al administrador");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formDeletePedido">
      <div className="from-group">
        <label htmlFor="idPedido">Ingresa numero de pedido</label>
        <input
          type="text"
          id="idPedido"
          name="idPedido"
          className="form-control"
          value={idPedido}
          onChange={(e) => setidPedido(e.target.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      <button type="submit" className="btn btn-primary">
        Eliminar Pedido
      </button>
    </form>
  );
};

export default DeletePedido;
