import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="container">
      <h1 className="title">Welcome to E-Shop</h1>
      <div className="home">
        <img
          src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg"
          alt="img"
          className="banner"
        />
        <div className="category">
          <h1>PICK YOUR CATEGORY</h1>
          <div className="links">
            <Link to="/electronics" className="link">
              Electronics
            </Link>
            <Link to="/books" className="link">
              Books
            </Link>
            <Link to="/cart" className="link">
              Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
