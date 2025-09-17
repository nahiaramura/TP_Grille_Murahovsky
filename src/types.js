import PropTypes from "prop-types";

export const quantityValidator = (props, propName) => {
  const v = props[propName];
  if (typeof v !== "number" || !Number.isFinite(v)) {
    return new Error("quantity debe ser un número.");
  }
  if (v <= 0) return new Error("quantity debe ser > 0.");
  return null;
};

export const priceValidator = (props, propName) => {
  const v = props[propName];
  if (typeof v !== "number" || !Number.isFinite(v)) {
    return new Error("price debe ser un número.");
  }
  if (v < 0) return new Error("price no puede ser negativo.");
  return null;
};

export const customerValidator = (props, propName) => {
  const v = props[propName];
  if (typeof v !== "string") return new Error("customer debe ser string.");
  if (v.trim().length < 3)
    return new Error("customer debe tener mínimo 3 caracteres.");
  return null;
};

export const itemShape = PropTypes.exact({
  productId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  quantity: quantityValidator,
  price: priceValidator,
});

export const orderShape = PropTypes.exact({
  id: PropTypes.number.isRequired,
  customer: customerValidator,
  items: PropTypes.arrayOf(itemShape).isRequired,
  status: PropTypes.oneOf(["pending", "shipped", "delivered"]),
  date: PropTypes.instanceOf(Date),
});
