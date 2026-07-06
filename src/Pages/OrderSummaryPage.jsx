import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSummaryPage() {
  const navigate = useNavigate();

  const [order] = useState(() => {
    const savedOrder = localStorage.getItem("lastOrder");
    return savedOrder ? JSON.parse(savedOrder) : null;
  });

  useEffect(() => {
    if (!order) navigate("/");
  }, []);
  if (!order) return null;
  return (
    <div className="container">
      <h1>🎉 Order Placed Successfully!</h1>
      <div className="checkout-summary">
        <p>
          <strong>Order ID:</strong> {order.id}
        </p>
        <p>
          <strong>Order Date:</strong> {order.date}
        </p>
        <p>
          <strong>Customer:</strong>
          {order.customer.name}
        </p>
        <p>
          <strong>Email:</strong>
          {order.customer.email}
        </p>
        <p>
          <strong>Phone:</strong>
          {order.customer.phone}
        </p>
        <p>
          <strong>Address:</strong>
          {order.customer.address}
        </p>

        <hr />

        <h2>Ordered Items</h2>

        {order.cart.map((item) => (
          <div className="summary-item" key={item.id}>
            <span>
              {item.name || item.title} x {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toLocaleString("en-IN")}</span>
          </div>
        ))}
        <hr />
        <h2>Total: ${order.total.toLocaleString("en-IN")}</h2>
        <button className="btn-primary-link" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
