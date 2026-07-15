import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-checkout-script")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "razorpay-checkout-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}
const RAZOR_TEST_KEY = "rzp_test_TDISihyRPXCh8H";

export default function PaymentPages() {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const location = useLocation();

  const customer = location.state?.customer;

  const [method, setMethod] = useState("online");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  if (!customer) {
    return <Navigate to="/checkout" replace />;
  }

  const finalizeOrder = (paymentDetails) => {
    console.log("1. finalizeOrder called");
    const order = {
      id: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleString(),
      customer,
      cart: items,
      total: totalPrice,
      payment: paymentDetails,
    };

    localStorage.setItem("lastOrder", JSON.stringify(order));

    localStorage.removeItem("checkoutForm");

    navigate("/order-success");
  };

  const handleOnlinePayment = async () => {
    setError("");
    setProcessing(true);

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      setError("Could not load Razorpay. Check your connection and try again.");
      setProcessing(false);
      return;
    }

    const options = {
      key: RAZOR_TEST_KEY,
      amount: Math.round(totalPrice * 100),
      currency: "INR",
      name: "EZ-Shopping",
      description: `Order for ${items.length} items`,
      prefill: {
        name: customer.name,
        email: customer.email,
        contact: customer.phone,
      },
      theme: { color: "#16a34a" },
      handler: (response) => {
        finalizeOrder({
          method: "Online (Razorpay)",
          status: "Paid",
          paymentId: response.razorpay_payment_id,
        });
      },
      modal: {
        ondismiss: () => {
          setProcessing(false);
          setError("Payment was cancelled. You can try again later.");
        },
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.on("payment.failed", (response) => {
      setProcessing(false);
      setError(`Payment Failed ${response.error.description}`);
    });
    razorpay.open();
  };

  const handleCashOnDelivery = () => {
    finalizeOrder({
      method: "Cash On Delivery",
      status: "Pending",
      paymentId: null,
    });
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "500px", margin: "3rem auto" }}
    >
      <h1>Payment</h1>

      <div className="checkout-summary" style={{ marginBottom: "1.5rem" }}>
        <h2>Amount Payable: ${totalPrice.toLocaleString("en-IN")}</h2>
      </div>
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          marginBottom: "1.5rem",
        }}
      >
        <label
          style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
        >
          <input
            type="radio"
            name="payment-method"
            checked={method === "online"}
            onChange={() => setMethod("online")}
          />
          Pay Online - Card / UPI (Razorpay,test mode)
        </label>
        <br />
        <br />
        <label
          style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
        >
          <input
            type="radio"
            name="payment-method"
            checked={method === "COD"}
            onChange={() => setMethod("COD")}
          />
          Cash On Delivery
        </label>
      </div>
      <br />
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {method === "online" ? (
        <button
          className="btn-link"
          onClick={handleOnlinePayment}
          disabled={processing}
        >
          {processing
            ? "Opening Razorpay..."
            : `Pay $${totalPrice.toLocaleString("en-IN")}`}
        </button>
      ) : (
        <button className="btn-link" onClick={handleCashOnDelivery}>
          Place Order (Pay on Delivery)
        </button>
      )}
      <button
        className="btn-danger-link"
        onClick={() => {
          navigate("/");
        }}
      >
        Cancel
      </button>
    </div>
  );
}
