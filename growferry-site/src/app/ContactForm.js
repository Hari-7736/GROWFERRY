"use client";

import { useState } from "react";

export default function ContactForm() {
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ state: "idle", text: "" });

  function update(field) {
    return (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus({ state: "sending", text: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ state: "error", text: data.error || "Something went wrong. Please try again." });
        return;
      }
      setStatus({ state: "ok", text: "Thanks — your message has been sent. We'll reply soon." });
      setValues({ name: "", email: "", message: "" });
    } catch {
      setStatus({ state: "error", text: "Couldn't send that. Check your connection and try again." });
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your name"
        value={values.name}
        onChange={update("name")}
        required
      />
      <input
        type="email"
        placeholder="Your email"
        value={values.email}
        onChange={update("email")}
        required
      />
      <textarea
        placeholder="Tell us about your project"
        value={values.message}
        onChange={update("message")}
        required
      />
      <button className="btn-primary" type="submit" disabled={status.state === "sending"}>
        {status.state === "sending" ? "Sending…" : "Send message"}
      </button>
      {status.text && (
        <p className={`form-msg ${status.state === "ok" ? "ok" : "err"}`}>{status.text}</p>
      )}
    </form>
  );
}
