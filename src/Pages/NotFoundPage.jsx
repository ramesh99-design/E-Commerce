import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const NavigateToHome = () => {
    navigate("/");
  };
  return (
    <div className="not-found">
      <h1 className="title">404 - Page Not Found</h1>
      <p
        style={{ paddingTop: "20px", textAlign: "center", fontSize: "1.4rem" }}
      >
        The page you are looking for does not exist.
      </p>
      <button className="btn-danger-link center-btn" onClick={NavigateToHome}>
        Home
      </button>
    </div>
  );
}
