"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const FIELDS = [
  { key: "heroHeadline", label: "Hero headline", type: "input" },
  { key: "heroSub", label: "Hero subheading", type: "textarea" },
  { key: "aboutText", label: "About paragraph", type: "textarea" },
  { key: "missionText", label: "Mission", type: "textarea" },
  { key: "visionText", label: "Vision", type: "textarea" },
  { key: "email", label: "Contact email", type: "input" },
  { key: "phone", label: "Contact phone", type: "input" },
  { key: "location", label: "Location", type: "input" },
];

export default function DashboardClient({ initialContent, messages }) {
  const router = useRouter();
  const [values, setValues] = useState(initialContent);
  const [status, setStatus] = useState({ state: "idle", text: "" });

  function update(key) {
    return (e) => setValues((v) => ({ ...v, [key]: e.target.value }));
  }

  async function handleSave(e) {
    e.preventDefault();
    setStatus({ state: "saving", text: "" });
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setStatus({ state: "error", text: data.error || "Couldn't save changes." });
        return;
      }
      setStatus({ state: "ok", text: "Saved. Live on the site now." });
      router.refresh();
    } catch {
      setStatus({ state: "error", text: "Couldn't reach the server." });
    }
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="admin-page">
      <div className="admin-topbar">
        <h1>Site content</h1>
        <button className="admin-btn danger" onClick={handleLogout}>Sign out</button>
      </div>

      <form className="admin-section" onSubmit={handleSave}>
        <h2>Editable text</h2>
        {FIELDS.map((f) => (
          <div className="admin-field" key={f.key}>
            <label htmlFor={f.key}>{f.label}</label>
            {f.type === "textarea" ? (
              <textarea id={f.key} value={values[f.key] || ""} onChange={update(f.key)} />
            ) : (
              <input id={f.key} value={values[f.key] || ""} onChange={update(f.key)} />
            )}
          </div>
        ))}
        <button className="admin-btn" type="submit" disabled={status.state === "saving"}>
          {status.state === "saving" ? "Saving…" : "Save changes"}
        </button>
        {status.text && (
          <p className={`form-msg ${status.state === "ok" ? "ok" : "err"}`} style={{ marginTop: 10 }}>
            {status.text}
          </p>
        )}
      </form>

      <div className="admin-section">
        <h2>Contact form messages ({messages.length})</h2>
        {messages.length === 0 ? (
          <p className="msg-empty">No messages yet.</p>
        ) : (
          messages.map((m) => (
            <div className="msg-item" key={m.id}>
              <div className="meta">
                {m.name} · {m.email} · {new Date(m.createdAt).toLocaleString()}
              </div>
              <div>{m.message}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
