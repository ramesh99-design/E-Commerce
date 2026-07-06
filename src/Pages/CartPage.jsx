import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../Features/Cart/CartSlice";

export default function CartPage() {
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  if (items.length === 0) {
    return (
      <div className="not-found">
        <p className="errorNumber">🛒</p>
        <p className="errorMessage">Your cart is empty!</p>
        <Link to="/" className="btn-primary-link">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card-header">
        <div
          style={{
            alignItems: "center",
            gap: "1rem",
            display: "flex",
          }}
        >
          <h1>Your Cart ({totalQuantity} items)</h1>
        </div>
        <div
          style={{
            alignItems: "center",
            gap: "1rem",
            display: "flex",
          }}
        >
          <button
            className="btn-danger-link"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
          <button className="btn-danger-link" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
      <div className="cart-list">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.imageLink} alt={item.name || item.title} />
            <div className="cart-item-details">
              <p className="product-details">{item.name || item.title}</p>
              <p>₹{item.price.toLocaleString("en-IN")}</p>
            </div>
            <div className="cart-item-actions">
              <button
                className="qty-btn"
                onClick={() => dispatch(decreaseQuantity(item.id))}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="qty-btn"
                onClick={() => dispatch(increaseQuantity(item.id))}
              >
                +
              </button>
            </div>
            <p>₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
            <button
              className="btn-danger-link"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Total: ₹{totalPrice.toLocaleString("en-IN")}</h2>
        <Link to="/checkout" className="btn-primary-link">
          Proceed to Checkout →
        </Link>
      </div>
    </div>
  );
}
