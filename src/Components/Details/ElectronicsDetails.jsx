import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Features/Cart/CartSlice";

export default function ElectronicsDetails({ product }) {
  const { name, price, stock, imageLink } = product;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="product">
      <img src={imageLink} alt={name} style={{ height: "400px" }} />
      <p>
        <span className="product-details">Product:</span> {name}
      </p>
      <p>
        <span className="product-details">Price:</span> ${price}
      </p>
      <p>
        <span className="product-details">Availability:</span>{" "}
        {stock > 0 ? (
          <span style={{ color: "green" }}>In Stock ({stock} available)</span>
        ) : (
          <span style={{ color: "red" }}>Out of Stock</span>
        )}
      </p>
      <div className="card-buttons" style={{ flex: 1 }}>
        <button
          className="btn-line-link"
          onClick={() => {
            dispatch(addToCart(product));
            navigate("/cart");
          }}
        >
          Add To Cart
        </button>
        <button
          className="btn-danger-link"
          onClick={() => navigate("/electronics")}
        >
          Back
        </button>
        <button
          className="btn-primary-link"
          onClick={() => navigate(`/admin/products?id=${product.id}`)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
