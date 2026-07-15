import { useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { logout } from "../../Services/AuthServices";

export default function Navbar() {
  const { totalQuantity } = useSelector((state) => state.cart);

  const wishlistCount = useSelector((state) => state.wishlist.items.length);

  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className={`navbar ${isHomePage ? "navbar-left" : ""}`}>
      <Link to="/" className="nav-logo">
        🛍️ EZ-Cart
      </Link>

      {!isHomePage && (
        <div className="navbar-center">
          <Link to="/admin/products" className="nav-link">
            🛠️ Manage Products
          </Link>
          <Link to="/electronics" className="nav-link">
            💻 Electronics
          </Link>
          <Link to="/books" className="nav-link">
            📚 Books
          </Link>
          <Link to="/wishlist" className="nav-link">
            ❤️ Wishlist ({wishlistCount})
          </Link>
          <Link to="/cart" className="nav-link cart-icon">
            🛒 Cart
            {totalQuantity > 0 && (
              <span className="cart-badge">{totalQuantity}</span>
            )}
          </Link>
        </div>
      )}
      {user && (
        <div className="navbar-right">
          <span className="nav-user">Hello, {user.name}</span>
          <button className="btn-danger-link" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
