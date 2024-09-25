import { useState } from "react";
import AddPedido from "../../common/addPedido/AddPedido";
import DeletePedido from "../../common/deletePedido/DeletePedido";
import "./GestionPedidos.css";

const GestionPedidos = () => {
  const [selectedOption, setSelectedOption] = useState("Agregar Pedido");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="panel-pedidos">
      <div >
        <select className="card-title" onChange={handleOptionChange} value={selectedOption}>
          <option value="Agregar Pedido">Agregar Pedido</option>
          <option value="Eliminar Pedido">Eliminar Pedido</option>
        </select>
        <div className="card-body">
          {selectedOption === "Agregar Pedido" && <AddPedido />}
          {selectedOption === "Eliminar Pedido" && <DeletePedido />}
        </div>
      </div>
    </div>
  );
};

export default GestionPedidos;
