import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PriceDisplay from "../Components/Design/PriceDisplay";

export default function CheckoutPage() {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("checkoutForm"));

    return {
      name: saved?.name || "",
      email: saved?.email || "",
      phone: saved?.phone || "",
      address: saved?.address || "",
    };
  });
  useEffect(() => {
    localStorage.setItem("checkoutForm", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const proceedToPayment = (e) => {
    e.preventDefault();
    navigate("/payment", { state: { customer: formData } });
  };

  if (items.length === 0) {
    return (
      <div className="not-found">
        <h2>Your Cart is empty.</h2>
        <button className="btn-primary-link" onClick={() => navigate("/")}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Checkout</h2>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={proceedToPayment}>
          <h2>Billing Details</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Ph No"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <textarea
            name="address"
            placeholder="Shipping Address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="btn-primary-link">
            Place Order
          </button>
        </form>
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          {items.map((item) => (
            <div key={item.id} className="summary-item">
              <span>
                {item.name || item.title} x {item.quantity}
              </span>
              <span>
                <PriceDisplay price={item.price} quantity={item.quantity} />
              </span>
            </div>
          ))}
          <hr />
          <hr />
          <br />
          <h2>
            Total: <PriceDisplay price={totalPrice} />
          </h2>
        </div>
      </div>
    </div>
  );
}
