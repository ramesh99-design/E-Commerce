import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../../Services/AuthServices";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signup(name, email, password);
      navigate("/");
    } catch (err) {
      setError(
        err.code === "auth/email-already-in-use"
          ? "Email already in use."
          : "Could not create an account.",
      );
    }
  };
  return (
    <div
      className="container"
      style={{ maxWidth: "400px", margin: "4rem auto" }}
    >
      <h1>Sign Up</h1>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="search-input"
          required
        />
        <br />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="search-input"
          required
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="search-input"
          required
        />
        <br />
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" className="btn-link">
          Sign Up
        </button>
      </form>
      <br />
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
