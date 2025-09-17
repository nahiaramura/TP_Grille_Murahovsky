import React from "react";
import PropTypes from "prop-types";

const OrderFilter = React.memo(({ filter, setFilter }) => {
  return (
    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
      <option value="">Todos</option>
      <option value="pending">Pendientes</option>
      <option value="shipped">Enviados</option>
      <option value="delivered">Entregados</option>
    </select>
  );
});

OrderFilter.propTypes = {
  filter: PropTypes.oneOf(["pending", "shipped", "delivered", ""]),
  setFilter: PropTypes.func.isRequired,
};

export default OrderFilter;
