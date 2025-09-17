import React from "react";
import PropTypes from "prop-types";
import { itemShape } from "../types";

const currency = (n) => `$${n.toFixed(2)}`;

const OrderItem = React.memo(({ id, customer, items, status, date, onStatusChange }) => {
  const total = items.reduce((acc, it) => acc + it.quantity * it.price, 0);

  return (
    <div className="order-item" style={{ marginBottom: 16, padding: 12, border: "1px solid #444", borderRadius: 8 }}>
      <h3>Pedido #{id}</h3>
      <p><strong>Cliente:</strong> {customer}</p>
      <p><strong>Fecha:</strong> {date.toLocaleDateString()}</p>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Producto</th>
              <th>Cant.</th>
              <th>Precio</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.productId}>
                <td>{it.name}</td>
                <td style={{ textAlign: "center" }}>{it.quantity}</td>
                <td style={{ textAlign: "right" }}>{currency(it.price)}</td>
                <td style={{ textAlign: "right" }}>{currency(it.quantity * it.price)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} style={{ textAlign: "right", fontWeight: "bold" }}>Total</td>
              <td style={{ textAlign: "right", fontWeight: "bold" }}>{currency(total)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div style={{ marginTop: 8 }}>
        <strong>Estado:</strong>{" "}
        <select value={status} onChange={(e) => onStatusChange(id, e.target.value)}>
          <option value="pending">pending</option>
          <option value="shipped">shipped</option>
          <option value="delivered">delivered</option>
        </select>
      </div>
    </div>
  );
});

OrderItem.propTypes = {
  id: PropTypes.number.isRequired,
  customer: PropTypes.string.isRequired,       
  items: PropTypes.arrayOf(itemShape).isRequired,
  status: PropTypes.oneOf(["pending", "shipped", "delivered"]),
  date: PropTypes.instanceOf(Date),
  onStatusChange: PropTypes.func.isRequired,
};

OrderItem.defaultProps = {
  status: "pending",
  date: new Date(),
};

export default OrderItem;
