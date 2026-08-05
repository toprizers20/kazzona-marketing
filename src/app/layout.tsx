import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import "@/lib/env"; // Validate env vars at startup
import { prisma } from "@/lib/db";
import ClientProviders from "@/components/ClientProviders";
import { sanitizeHeaderScript } from "@/lib/sanitize";
import { getCached, setCache, CACHE_KEYS, CACHE_TTL } from "@/lib/cache";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kazzona.com"),
  title: {
    default: "Kazzona Marketing Agency | Strategy. Creativity. Results.",
    template: "%s | Kazzona Marketing",
  },
  description: "We don't just market. We grow brands. Data-driven SEO, premium web development, and high-ROI advertising for startups and enterprises.",
  keywords: ["Digital Marketing Agency", "SEO Optimization", "Website Development", "Email Marketing", "Graphic Designing", "Kazzona Marketing", "Noida Marketing Agency"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://kazzona.com",
    title: "Kazzona Marketing Agency | Strategy. Creativity. Results.",
    description: "We don't just market. We grow brands. Data-driven SEO, premium web development, and high-ROI advertising.",
    siteName: "Kazzona Marketing Agency",
    images: [
      {
        url: "https://kazzona.com/icon.svg",
        width: 1200,
        height: 630,
        alt: "Kazzona Marketing Agency - Digital Marketing Agency in Delhi NCR",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kazzona Marketing Agency | Strategy. Creativity. Results.",
    description: "We don't just market. We grow brands. Data-driven SEO, premium web development, and high-ROI advertising.",
    images: ["https://kazzona.com/icon.svg"],
    site: "@kazzona_marketingagency",
    creator: "@kazzona_marketingagency",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings = getCached<Record<string, string | null>>(CACHE_KEYS.SITE_SETTINGS);
  if (!settings) {
    try {
      const dbSettings = await prisma.siteSettings.findUnique({
        where: { id: "global" },
      });
      settings = dbSettings as Record<string, string | null> | null;
      if (settings) {
        setCache(CACHE_KEYS.SITE_SETTINGS, settings, CACHE_TTL.SITE_SETTINGS);
      }
    } catch (err) {
      console.error("Failed to query global site settings in RootLayout:", err);
    }
  }

  return (
    <html
      lang={settings?.defaultLang || "en"}
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Kazzona Marketing Agency",
              "image": "https://kazzona.com/icon.svg",
              "@id": "https://kazzona.com",
              "url": "https://kazzona.com",
              "telephone": "+91-9999568910",
              "email": "official.kazzona@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Sector 62",
                "addressLocality": "Noida",
                "addressRegion": "UP",
                "postalCode": "201301",
                "addressCountry": "IN"
              },
              "sameAs": [
                "https://www.instagram.com/kazzona_marketingagency"
              ]
            })
          }}
        />
        {settings?.gscVerification && (
          <meta name="google-site-verification" content={settings.gscVerification} />
        )}
        {settings?.gaTrackingId && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${settings.gaTrackingId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${settings.gaTrackingId}');
                `,
              }}
            />
          </>
        )}
        {settings?.gtmContainerId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${settings.gtmContainerId}');
              `,
            }}
          />
        )}
        <link rel="alternate" hrefLang="en-IN" href="https://kazzona.com" />
        <link rel="alternate" hrefLang="x-default" href="https://kazzona.com" />
        {settings?.globalHeadCode && sanitizeHeaderScript(settings.globalHeadCode) && (
          <div
            style={{ display: "none" }}
            dangerouslySetInnerHTML={{ __html: sanitizeHeaderScript(settings.globalHeadCode)! }}
          />
        )}
      </head>
      <body className="min-h-full flex flex-col font-sans">
        {settings?.gtmContainerId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${settings.gtmContainerId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
