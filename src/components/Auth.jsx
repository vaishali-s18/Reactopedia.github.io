import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function Auth() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      // Redirect to home if logged in
      if (firebaseUser) {
        navigate("/");
      }
    });
    return () => unsub();
  }, [navigate]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setEmail("");
      setPassword("");
      // Redirect will happen in onAuthStateChanged
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  // Main card style
  const cardStyle = {
    margin: "2rem auto",
    maxWidth: 400,
    background: "rgba(255,255,255,0.95)",
    borderRadius: 16,
    boxShadow: "0 8px 32px 0 rgba(99,102,241,0.15)",
    padding: "2.5rem 2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.2em",
    alignItems: "center",
    border: "1px solid #e0e7ff",
  };

  // Input style
  const inputStyle = {
    padding: "0.75em",
    borderRadius: 8,
    border: "1px solid #c7d2fe",
    width: "100%",
    fontSize: "1rem",
    outline: "none",
    marginBottom: "0.5em",
    background: "#f8fafc",
    transition: "border 0.2s",
  };

  // Button style
  const buttonStyle = {
    padding: "0.75em",
    borderRadius: 8,
    background: "#6366f1",
    color: "#fff",
    border: "none",
    width: "100%",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    marginBottom: "0.5em",
    transition: "background 0.2s",
  };

  // Toggle button style
  const toggleStyle = {
    background: "none",
    border: "none",
    color: "#6366f1",
    textDecoration: "underline",
    cursor: "pointer",
    fontSize: "0.95rem",
    marginTop: "-0.5em",
  };

  // Password toggle style
  const showPassStyle = {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#6366f1",
    fontWeight: "bold",
    fontSize: "0.95rem",
  };

  if (user) {
    return (
      <div style={cardStyle}>
        <p style={{ fontSize: "1.1rem", marginBottom: "1.5em" }}>
          Welcome, <b>{user.email}</b>!
        </p>
        <button
          onClick={handleLogout}
          style={buttonStyle}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleAuth} style={cardStyle}>
      <h2 style={{ color: "#6366f1", marginBottom: "1em", fontWeight: 700, fontSize: "1.6rem" }}>
        {isRegister ? "Register" : "Sign In"}
      </h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={inputStyle}
      />
      <div style={{ position: "relative", width: "100%" }}>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          style={showPassStyle}
          tabIndex={-1}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
      <button
        type="submit"
        style={buttonStyle}
        disabled={loading}
      >
        {loading ? (isRegister ? "Registering..." : "Signing In...") : isRegister ? "Register" : "Sign In"}
      </button>
      <button
        type="button"
        onClick={() => setIsRegister((v) => !v)}
        style={toggleStyle}
      >
        {isRegister ? "Already have an account? Sign In" : "Don't have an account? Register"}
      </button>
      {error && <p style={{ color: "red", textAlign: "center", marginTop: "0.5em" }}>{error}</p>}
    </form>
  );
}