export default function sitemap() {
  const siteUrl = process.env.SITE_URL || "https://growferry.vercel.app";
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
