import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../Services/AuthServices";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("Invalid email or password.");
    }
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "400px", margin: "4rem auto" }}
    >
      <h1>Login</h1>
      <br/>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="search-input"
          required
        />
        <br />
        <br />
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="search-input"
          required
        />
        <br />
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className="btn-link">
          Login
        </button>
      </form>
      <br />
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
