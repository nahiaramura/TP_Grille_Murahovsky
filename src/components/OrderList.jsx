import React, { useMemo } from "react";
import PropTypes from "prop-types";
import OrderItem from "./OrderItem";
import { orderShape } from "../types";

const OrderList = React.memo(({ orders, filter, onStatusChange }) => {
  const filteredOrders = useMemo(
    () => (filter ? orders.filter((o) => o.status === filter) : orders),
    [orders, filter]
  );

  return (
    <div>
      {filteredOrders.map((order) => (
        <OrderItem key={order.id} {...order} onStatusChange={onStatusChange} />
      ))}
      {filteredOrders.length === 0 && <p>Sin pedidos para el filtro seleccionado.</p>}
    </div>
  );
});

OrderList.propTypes = {
  orders: PropTypes.arrayOf(orderShape).isRequired,  // ✔ pedidos tipados
  filter: PropTypes.oneOf(["pending", "shipped", "delivered", ""]),
  onStatusChange: PropTypes.func.isRequired,
};

export default OrderList;
