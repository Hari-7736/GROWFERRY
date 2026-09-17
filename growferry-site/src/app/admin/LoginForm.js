"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [values, setValues] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Sign in failed.");
        setLoading(false);
        return;
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Couldn't reach the server. Try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="admin-field">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={values.username}
          onChange={(e) => setValues((v) => ({ ...v, username: e.target.value }))}
          autoComplete="username"
          required
        />
      </div>
      <div className="admin-field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={values.password}
          onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
          autoComplete="current-password"
          required
        />
      </div>
      {error && <p className="form-msg err" style={{ marginBottom: 12 }}>{error}</p>}
      <button className="admin-btn" type="submit" disabled={loading} style={{ width: "100%" }}>
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
