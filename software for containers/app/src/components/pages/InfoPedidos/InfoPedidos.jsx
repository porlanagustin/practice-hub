import "./InfoPedidos.css";
import axios from "axios";
import { useState, useEffect } from "react";

const indexDates = [
  { month: "Enero", index: 0 },
  { month: "Febrero", index: 1 },
  { month: "Marzo", index: 2 },
  { month: "Abril", index: 3 },
  { month: "Mayo", index: 4 },
  { month: "Junio", index: 5 },
  { month: "Julio", index: 6 },
  { month: "Agosto", index: 7 },
  { month: "Septiembre", index: 8 },
  { month: "Octubre", index: 9 },
  { month: "Noviembre", index: 10 },
  { month: "Diciembre", index: 11 },
];

const InfoPedidos = () => {
  const [monthSelected, setMonthSelected] = useState("Todos");
  const [pedidos, setPedidos] = useState([]);
  const [filteredPedidos, setFilteredPedidos] = useState([]);

  const fetchPedidos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getPedidos");
      setPedidos(response.data);
      console.log("FETCHPEDIDOS:", response.data);
    } catch (error) {
      console.error("Error fetching pedidos:", error);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  useEffect(() => {
    if (monthSelected === "Todos") {
      setFilteredPedidos(pedidos);
    } else {
      const monthIndex = indexDates.find(
        (month) => month.month === monthSelected
      )?.index;

      if (monthIndex !== undefined) {
        const filtered = pedidos.filter((pedido) => {
          const dateParts = pedido.fechaPedido.split("-");

          const month = parseInt(dateParts[1], 10) - 1;

          return month === monthIndex;
        });

        setFilteredPedidos(filtered);
      }
    }
  }, [monthSelected, pedidos]);

  return (
    <div className="pedidos-main-content">
      {/* BARRA FILTRO DE PEDIDOS */}
      <div className="pedidos-work-dates">
        <div className="pedidos-dropdown">
          <button className="pedidos-dropbtn">{monthSelected}</button>
          <div className="pedidos-dropdown-content">
            <a onClick={() => setMonthSelected("Todos")} href="#">
              Todos
            </a>
            {indexDates.map((category, index) => (
              <a
                key={index}
                onClick={() => setMonthSelected(category.month)}
                href="#"
              >
                {category.month}
              </a>
            ))}
          </div>
        </div>
        <ul>
          {filteredPedidos.map((date, index) => (
            <li key={index}><h2>{date.fechaPedido}</h2></li>
          ))}
        </ul>
        <button className="pedidos-reload-button" onClick={fetchPedidos}>
          <img src="/reloadIcon.png" alt="Reload" />
        </button>
      </div>

      {/* INFORMACION DE LOS PEDIDOS */}
      <div className="pedidos-work-info">
        <div className="pedidos-work-header">
          <h2>Fecha de pedido</h2>
          <h2>Fecha de entrega</h2>
          <h2>Cliente</h2>
          <h2>Tipo de Contenedor</h2>
          <h2>Estado</h2>
          <h2>Dirección de entrega</h2>
        </div>
        <div className="pedidos-work-container">
        {filteredPedidos.map((pedido, index) => (
          <div key={index} className="pedidos-work-row">
            <h2>{pedido.fechaPedido}</h2>
            <h2>{pedido.fechaEntrega}</h2>
            <h2>{pedido.cliente}</h2>
            <h2>{pedido.tipoContenedor}</h2>
            <h2>{pedido.estado}</h2>
            <h2>{pedido.direccionEntrega}</h2>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default InfoPedidos;
