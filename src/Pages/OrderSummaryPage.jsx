import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PriceDisplay from "../Components/Design/PriceDisplay";
import { clearCart } from "../Features/Cart/CartSlice";
import { useDispatch } from "react-redux";

export default function OrderSummaryPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const order = useMemo(() => {
    const savedOrder = localStorage.getItem("lastOrder");
    console.log(savedOrder);
    return savedOrder ? JSON.parse(savedOrder) : null;
  });
  useEffect(() => {
    if (!order) {
      navigate("/", { replace: true });
      return;
    }
    dispatch(clearCart());
  }, [order, dispatch, navigate]);

  if (!order) return null;
  return (
    <div className="container">
      <h1>🎉 Order Placed Successfully!</h1>
      <div className="checkout-summary">
        <p>
          <strong>Order ID :</strong> {order.id}
        </p>
        <p>
          <strong>Order Date :</strong> {order.date}
        </p>
        <p>
          <strong>Customer :</strong>
          {order.customer.name}
        </p>
        <p>
          <strong>Email :</strong>
          {order.customer.email}
        </p>
        <p>
          <strong>Phone :</strong>
          {order.customer.phone}
        </p>
        <p>
          <strong>Address :</strong>
          {order.customer.address}
        </p>
        <p>
          <strong>Payment Method :</strong>
          {order.payment?.method || "N/A"}
        </p>
        <p>
          <strong>Payment Status :</strong>
          {order.payment?.status || "N/A"}
        </p>
        {order.payment?.paymentId && (
          <p>
            <strong>Payment ID :</strong>
            {order.payment?.paymentId}
          </p>
        )}

        <hr />

        <h2>Ordered Items</h2>

        {order.cart.map((item) => (
          <div className="summary-item" key={item.id}>
            <span>
              {item.name || item.title} x {item.quantity}
            </span>
            <span>
              <PriceDisplay price={item.price} quantity={item.quantity} />
            </span>
          </div>
        ))}
        <hr />
        <h2>
          Total: <PriceDisplay price={order.total} />
        </h2>
        <button className="btn-primary-link" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
