import React, { useMemo, useState, useCallback } from "react";
import OrderList from "../components/OrderList";
import OrderFilter from "../components/OrderFilter";
import OrderStats from "../components/OrderStats";
import NewOrderForm from "../components/NewOrderForm";

const seed = [
  {
    id: 1,
    customer: "Nahiará",
    items: [
      { productId: 101, name: "Mouse", quantity: 2, price: 12.5 },
      { productId: 102, name: "Teclado", quantity: 1, price: 30 },
    ],
    status: "pending",
    date: new Date(),
  },
  {
    id: 2,
    customer: "Juan",
    items: [{ productId: 103, name: "Auriculares", quantity: 1, price: 50 }],
    status: "shipped",
    date: new Date(),
  },
  {
    id: 3,
    customer: "Sofía",
    items: [{ productId: 104, name: "Webcam", quantity: 3, price: 20 }],
    status: "delivered",
    date: new Date(),
  },
];

const Dashboard = () => {
  const [orders, setOrders] = useState(seed);
  const [filter, setFilter] = useState("");

  const onStatusChange = useCallback((id, newStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
  }, []);

  const onAdd = useCallback((order) => {
    setOrders((prev) => [...prev, order]);
  }, []);

  // Stats memorizadas (evita recalcular en renders donde orders no cambia)
  const stats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter((o) => o.status === "pending").length;
    const shipped = orders.filter((o) => o.status === "shipped").length;
    const delivered = orders.filter((o) => o.status === "delivered").length;
    return { total, pending, shipped, delivered };
  }, [orders]);

  return (
    <div className="container">
      <div className="app-card">
        <div className="app-header">
          <div className="brand">
            <img src="/logo.svg" alt="Logo MailAméricas" />
            <div>
              <div className="brand-title">MailAméricas</div>
              <div className="brand-sub">Gestión de pedidos y ventas</div>
            </div>
          </div>
          <div>
            <OrderFilter filter={filter} setFilter={setFilter} />
          </div>
        </div>
        <div className="content">
          <div className="stats">
            <div className="stat"><div className="label">Total</div><div className="value">{stats.total}</div></div>
            <div className="stat"><div className="label">Pendientes</div><div className="value">{stats.pending}</div></div>
            <div className="stat"><div className="label">Enviados</div><div className="value">{stats.shipped}</div></div>
            <div className="stat"><div className="label">Entregados</div><div className="value">{stats.delivered}</div></div>
          </div>

          <div className="grid two" style={{ marginTop: 16 }}>
            <div>
              <OrderList orders={orders} filter={filter} onStatusChange={onStatusChange} />
            </div>
            <div>
              <NewOrderForm onAdd={onAdd} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
