export default function robots() {
  const siteUrl = process.env.SITE_URL || "https://growferry.vercel.app";
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin"] },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
