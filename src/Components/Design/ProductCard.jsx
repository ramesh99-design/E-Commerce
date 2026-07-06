import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../Features/Cart/CartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../Features/Cart/WishListSlice";

export default function ProductCard({ item, title, detailLabel, onView }) {
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isWishListed = wishlistItems.some((product) => product.id === item.id);

  const cartItems = useSelector((state) => state.cart.items);

  const cartItem = cartItems.find((i) => i.id === item.id);

  const isOutOfStock = cartItem
    ? cartItem.quantity >= item.stock
    : item.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      return;
    }
    dispatch(addToCart(item));
  };

  const handleWishlist = () => {
    if (isWishListed) {
      dispatch(removeFromWishlist(item.id));
    } else {
      dispatch(addToWishlist(item));
    }
  };

  return (
    <div className="card">
      <div className="wishlist-icon">
        <button onClick={handleWishlist}>{isWishListed ? "❤️" : "🤍"}</button>
      </div>
      {isOutOfStock && <span className="out-of-stock-badge">Out of Stock</span>}
      {<img src={item.imageLink} alt={title} onClick={() => onView(item.id)} />}
      <p>
        <span className="product-details">{detailLabel}: </span>
        {title}
      </p>
      <p>
        <span className="product-details">Price: </span>$
        {item.price.toLocaleString("en-IN")}
      </p>
      <p
        style={{
          fontSize: "0.82rem",
          color: item.stock > 0 ? "green" : "red",
        }}
      >
        {item.stock > 0 ? `${item.stock} In stock` : "Out of Stock"}
      </p>
      <div className="card-buttons">
        <button className="btn-link" onClick={() => onView(item.id)}>
          View Details
        </button>
        <button
          className="btn-primary-link"
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          style={{ opacity: isOutOfStock ? 0.5 : 1 }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}
