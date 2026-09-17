import "./globals.css";

const siteUrl = process.env.SITE_URL || "https://growferry.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Growferry — Websites, Branding & Digital Marketing in Kerala",
    template: "%s | Growferry",
  },
  description:
    "Growferry is a digital agency in Kerala, India. We design and build websites, brands, and digital experiences for businesses that want to grow online.",
  keywords: [
    "Growferry",
    "web development Kerala",
    "website design agency India",
    "UI UX design agency",
    "branding agency Kerala",
    "digital marketing agency India",
  ],
  icons: { icon: "/logo.png" },
  openGraph: {
    title: "Growferry — Websites, Branding & Digital Marketing",
    description:
      "We design and build websites, brands, and digital experiences that convert visitors into customers.",
    url: siteUrl,
    siteName: "Growferry",
    images: [{ url: "/logo.png", width: 1200, height: 400, alt: "Growferry" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Growferry — Websites, Branding & Digital Marketing",
    description:
      "We design and build websites, brands, and digital experiences that convert visitors into customers.",
    images: ["/logo.png"],
  },
  alternates: { canonical: siteUrl },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Growferry",
  image: `${siteUrl}/logo.png`,
  url: siteUrl,
  email: "growferry@gmail.com",
  telephone: "+91-8714181898",
  address: { "@type": "PostalAddress", addressRegion: "Kerala", addressCountry: "IN" },
  areaServed: "IN",
  priceRange: "$$",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Manrope:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
