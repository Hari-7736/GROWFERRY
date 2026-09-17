import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/session";
import LoginForm from "./LoginForm";

export const metadata = { robots: { index: false, follow: false } };

export default function AdminLoginPage() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (verifySessionToken(token)) {
    redirect("/admin/dashboard");
  }

  return (
    <div className="admin-shell">
      <div className="admin-card">
        <h1>Site admin</h1>
        <p className="hint">Sign in to edit page content and view contact messages.</p>
        <LoginForm />
      </div>
    </div>
  );
}
