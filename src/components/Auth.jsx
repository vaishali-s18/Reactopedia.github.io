import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

export default function Auth() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (user) {
    return (
      <div style={{ margin: "2rem auto", maxWidth: 400, textAlign: "center" }}>
        <p>Welcome, <b>{user.email}</b>!</p>
        <button onClick={handleLogout} style={{ padding: "0.5em 1.5em", borderRadius: 8, background: "#6366f1", color: "#fff", border: "none" }}>
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleLogin} style={{ margin: "2rem auto", maxWidth: 400, display: "flex", flexDirection: "column", gap: "1em" }}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        style={{ padding: "0.75em", borderRadius: 8, border: "1px solid #ccc" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        style={{ padding: "0.75em", borderRadius: 8, border: "1px solid #ccc" }}
      />
      <button type="submit" style={{ padding: "0.75em", borderRadius: 8, background: "#6366f1", color: "#fff", border: "none" }}>
        Sign In
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}