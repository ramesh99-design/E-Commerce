import { useNavigate } from "react-router-dom";
import { addToCart } from "../../Features/Cart/CartSlice";
import { useDispatch } from "react-redux";

export default function BooksDetails(props) {
  const { imageLink, name, author, price, stock } = props.product;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="product">
      <img src={imageLink} alt={name} style={{ height: "600px" }} />
      <p>
        <span className="product-details">Title : </span> {name}
      </p>
      <p>
        <span className="product-details">Author : </span> {author}
      </p>
      <p>
        <span className="product-details">Price : </span> ${price}
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
            dispatch(addToCart(props.product));
            navigate("/cart");
          }}
          style={{}}
        >
          Add To Cart
        </button>
        <button
          className="btn-danger-link"
          onClick={() => navigate("/books")}
        >
          Back
        </button>
        <button
          className="btn-primary-link"
          onClick={() => navigate(`/admin/products?id=${props.product.id}`)}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
