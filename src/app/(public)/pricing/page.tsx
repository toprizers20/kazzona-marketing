import { getPricingConfig } from "@/app/actions/pricing";
import PricingPageClient from "./PricingPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Kazzona Marketing — All Services Pricing",
  description: "Transparent pricing for Website Development, SEO Services, and Paid Advertising. Affordable packages starting from ₹4,999. No hidden fees.",
  alternates: {
    canonical: "https://kazzona.com/pricing"
  },
  openGraph: {
    title: "Pricing | Kazzona Marketing — All Services Pricing",
    description: "Transparent pricing for Website Development, SEO Services, and Paid Advertising. Affordable packages starting from ₹4,999.",
    url: "https://kazzona.com/pricing",
    siteName: "Kazzona Marketing Agency",
    images: [
      {
        url: "https://kazzona.com/icon.svg",
        width: 1200,
        height: 630,
        alt: "Kazzona Marketing Pricing",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing | Kazzona Marketing — All Services Pricing",
    description: "Transparent pricing for Website Development, SEO Services, and Paid Advertising. Affordable packages starting from ₹4,999.",
    images: ["https://kazzona.com/icon.svg"],
  },
};

export default async function PricingPage() {
  const config = await getPricingConfig();

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "name": "Pricing | Kazzona Marketing",
        "description": "Transparent pricing for Website Development, SEO Services, and Paid Advertising.",
        "url": "https://kazzona.com/pricing",
        "provider": {
          "@type": "Organization",
          "name": "Kazzona Marketing",
          "url": "https://kazzona.com"
        }
      },
      {
        "@type": "ItemList",
        "name": "Kazzona Marketing Services",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "item": {
              "@type": "Service",
              "name": "SEO Services",
              "url": "https://kazzona.com/services/seo",
              "description": "Enterprise SEO services to rank #1 on Google India.",
              "provider": {
                "@type": "Organization",
                "name": "Kazzona Marketing"
              },
              "areaServed": "IN",
              "offers": {
                "@type": "Offer",
                "price": "4999",
                "priceCurrency": "INR",
                "priceValidUntil": "2026-12-31"
              }
            }
          },
          {
            "@type": "ListItem",
            "position": 2,
            "item": {
              "@type": "Service",
              "name": "Website Development",
              "url": "https://kazzona.com/services/website-development",
              "description": "Premium custom website development on Next.js and React.",
              "provider": {
                "@type": "Organization",
                "name": "Kazzona Marketing"
              },
              "areaServed": "IN",
              "offers": {
                "@type": "Offer",
                "price": "9999",
                "priceCurrency": "INR",
                "priceValidUntil": "2026-12-31"
              }
            }
          },
          {
            "@type": "ListItem",
            "position": 3,
            "item": {
              "@type": "Service",
              "name": "Performance Advertising",
              "url": "https://kazzona.com/services/advertisement",
              "description": "Google Ads, Meta Ads, and LinkedIn campaign management.",
              "provider": {
                "@type": "Organization",
                "name": "Kazzona Marketing"
              },
              "areaServed": "IN",
              "offers": {
                "@type": "Offer",
                "price": "4999",
                "priceCurrency": "INR",
                "priceValidUntil": "2026-12-31"
              }
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <PricingPageClient config={config} />
    </>
  );
}
