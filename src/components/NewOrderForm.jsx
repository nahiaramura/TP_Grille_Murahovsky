import React, { useState } from "react";
import PropTypes from "prop-types";

const NewOrderForm = ({ onAdd }) => {
  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState([
    { name: "", quantity: 1, price: 0 },
  ]);

  const addRow = () => setItems((prev) => [...prev, { name: "", quantity: 1, price: 0 }]);
  const updateRow = (idx, field, value) =>
    setItems((prev) =>
      prev.map((it, i) => (i === idx ? { ...it, [field]: field === "name" ? value : Number(value) } : it))
    );
  const removeRow = (idx) => setItems((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reglas de negocio del enunciado
    if (customer.trim().length < 3) {
      alert("El cliente debe tener al menos 3 caracteres.");
      return;
    }
    if (items.length === 0) {
      alert("Agregá al menos un producto.");
      return;
    }
    for (const it of items) {
      if (!it.name.trim()) return alert("Cada ítem debe tener nombre.");
      if (!Number.isFinite(it.quantity) || it.quantity <= 0)
        return alert("La cantidad debe ser > 0.");
      if (!Number.isFinite(it.price) || it.price < 0)
        return alert("El precio no puede ser negativo.");
    }

    const enriched = items.map((it, i) => ({
      productId: Date.now() + i,
      name: it.name.trim(),
      quantity: Number(it.quantity),
      price: Number(it.price),
    }));

    onAdd({
      id: Date.now(),
      customer: customer.trim(),
      items: enriched,
      status: "pending",      // default según consigna
      date: new Date(),       // default según consigna
    });

    setCustomer("");
    setItems([{ name: "", quantity: 1, price: 0 }]);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 16 }}>
      <h4>Nuevo pedido</h4>
      <input
        type="text"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
        placeholder="Cliente (mín. 3 caracteres)"
        style={{ marginRight: 8 }}
      />
      <div style={{ marginTop: 8 }}>
        <strong>Productos</strong>
        {items.map((it, idx) => (
          <div key={idx} className="form-row" style={{ margin: "6px 0" }}>
            <input
              placeholder="Nombre del producto"
              value={it.name}
              onChange={(e) => updateRow(idx, "name", e.target.value)}
              style={{ flex: 2 }}
              title="Nombre del producto"
            />
            <div style={{ width: 80 }}>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>Cantidad</div>
              <input
                type="number"
                min="1"
                placeholder="Cantidad"
                value={it.quantity}
                onChange={(e) => updateRow(idx, "quantity", e.target.value)}
                style={{ width: "100%", textAlign: "right" }}
                title="Cantidad de unidades"
              />
            </div>
            <div style={{ width: 120 }}>
              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>Precio unitario</div>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Precio unitario"
                value={it.price}
                onChange={(e) => updateRow(idx, "price", e.target.value)}
                style={{ width: "100%", textAlign: "right" }}
                title="Precio unitario"
              />
            </div>
            <button type="button" onClick={() => removeRow(idx)}>Quitar</button>
          </div>
        ))}
        <button type="button" onClick={addRow} style={{ marginTop: 4 }}>
          + Agregar producto
        </button>
      </div>

      <div className="form-actions" style={{ marginTop: 8 }}>
        <button type="submit">Agregar Pedido</button>
      </div>
    </form>
  );
};

NewOrderForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default NewOrderForm;
