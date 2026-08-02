import WebsiteDevelopmentClient from "./WebsiteDevelopmentClient";

export const metadata = {
  title: "Premium Website Development Agency | Kazzona Marketing",
  description: "High-ticket, custom-coded websites engineered for growth. We build premium, modern web experiences that convert visitors into clients.",
  alternates: {
    canonical: "https://kazzona.com/services/website-development",
  },
  openGraph: {
    title: "Premium Website Development Agency | Kazzona Marketing",
    description: "High-ticket, custom-coded websites engineered for growth. We build premium, modern web experiences that convert visitors into clients.",
    url: "https://kazzona.com/services/website-development",
    siteName: "Kazzona Marketing Agency",
    images: [{ url: "https://kazzona.com/icon.svg", width: 1200, height: 630, alt: "Kazzona Website Development" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Website Development Agency | Kazzona Marketing",
    description: "High-ticket, custom-coded websites engineered for growth. We build premium, modern web experiences that convert visitors into clients.",
    images: ["https://kazzona.com/icon.svg"],
    site: "@kazzona",
    creator: "@kazzona",
  },
};

export default function WebsiteDevelopmentPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Premium Website Development",
    "provider": {
      "@type": "Organization",
      "name": "Kazzona Marketing",
      "url": "https://kazzona.com",
      "logo": "https://kazzona.com/icon.svg"
    },
    "description": "High-ticket, custom-coded websites engineered for growth. We build premium, modern web experiences that convert visitors into clients.",
    "serviceType": "Website Development, Next.js Development, Custom Web Apps",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Website Development Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Website Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ecommerce Development"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Landing Page Design"
          }
        }
      ]
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "B2B, Startups, Enterprises"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <WebsiteDevelopmentClient />
    </>
  );
}
