import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, status } = useSelector((state) => state.auth);

  if (status === "loading") {
    return (
      <div className="container" style={{ textAlign: "center" }}>
        Loading...
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
