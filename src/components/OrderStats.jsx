import React from "react";
import PropTypes from "prop-types";

const OrderStats = React.memo(({ total, pending, shipped, delivered }) => (
  <div style={{ margin: "12px 0" }}>
    <p>Total: {total}</p>
    <p>Pendientes: {pending}</p>
    <p>Enviados: {shipped}</p>
    <p>Entregados: {delivered}</p>
  </div>
));

OrderStats.propTypes = {
  total: PropTypes.number.isRequired,
  pending: PropTypes.number.isRequired,
  shipped: PropTypes.number.isRequired,
  delivered: PropTypes.number.isRequired,
};

export default OrderStats;
