import { prisma } from "./prisma";

// Fallback copy used the first time the site runs, before anything has
// been saved from the admin panel.
export const DEFAULT_CONTENT = {
  heroHeadline: "Digital growth, built to last.",
  heroSub:
    "Growferry designs and builds websites, brands, and digital experiences for businesses that are ready to grow online.",
  aboutText:
    "Growferry is a digital agency based in Kerala, India. We build websites, brands, and digital experiences for businesses that want to grow online — combining design, technology, and strategy in every project.",
  missionText: "Help businesses grow through thoughtful design and modern technology.",
  visionText: "To be a trusted long-term digital partner for startups and growing businesses.",
  email: "growferry@gmail.com",
  phone: "+91 8714181898",
  location: "Kerala, India",
};

export async function getContent() {
  try {
    const rows = await prisma.siteContent.findMany();
    const fromDb = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return { ...DEFAULT_CONTENT, ...fromDb };
  } catch (err) {
    // If the database isn't reachable yet (e.g. first deploy before
    // migrations ran), fall back to the defaults instead of crashing the page.
    console.error("getContent failed, using defaults:", err.message);
    return { ...DEFAULT_CONTENT };
  }
}

export async function setContent(partial) {
  const entries = Object.entries(partial).filter(([key]) => key in DEFAULT_CONTENT);
  await prisma.$transaction(
    entries.map(([key, value]) =>
      prisma.siteContent.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      })
    )
  );
}
