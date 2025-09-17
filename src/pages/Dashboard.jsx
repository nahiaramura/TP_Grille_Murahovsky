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
    <div style={{ maxWidth: 900, margin: "32px auto", padding: "0 16px" }}>
      <h1>Gestión de Pedidos</h1>
      <OrderFilter filter={filter} setFilter={setFilter} />
      <OrderStats {...stats} />
      <OrderList orders={orders} filter={filter} onStatusChange={onStatusChange} />
      <NewOrderForm onAdd={onAdd} />
    </div>
  );
};

export default Dashboard;
