import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/session";
import { getContent } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import DashboardClient from "./DashboardClient";

export const metadata = { robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const token = cookies().get(SESSION_COOKIE)?.value;
  if (!verifySessionToken(token)) {
    redirect("/admin");
  }

  const content = await getContent();
  const messages = await prisma.contactMessage
    .findMany({ orderBy: { createdAt: "desc" }, take: 50 })
    .catch(() => []);

  return <DashboardClient initialContent={content} messages={messages} />;
}
