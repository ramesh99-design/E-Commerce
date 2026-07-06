import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../Features/Cart/CartSlice"
import { removeFromWishlist } from "../Features/Cart/WishListSlice";

export default function WishlistPage() {
  const wishlist = useSelector((state) => state.wishlist.items);

  const dispatch = useDispatch();

  if (wishlist.length === 0) {
    return (
      <div className="not-found">
        <h2>Your Wishlist is Empty ❤️</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>My Wishlist</h1>
      <div className="card-grid">
        {wishlist.map((item) => (
          <div className="card" key={item.id}>
            <img src={item.imageLink} alt={item.name || item.title} />
            <h3>{item.name || item.title}</h3>
            <p>${item.price} </p>
            <button
              className="btn-link"
              onClick={() => dispatch(addToCart(item))}
            >
              Add To Cart
            </button>
            <button
              className="btn-danger-link"
              onClick={() => dispatch(removeFromWishlist(item.id))}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
