import { getPricingConfig } from "@/app/actions/pricing";
import SEOClient from "./SEOClient";

export const metadata = {
  title: "Enterprise SEO Services in India | Kazzona Marketing",
  description: "Rank #1 on Google India. We help Indian startups and enterprises dominate organic search, drive high-intent traffic, and scale revenue.",
  alternates: {
    canonical: "https://kazzona.com/services/seo",
  },
  openGraph: {
    title: "Enterprise SEO Services in India | Kazzona Marketing",
    description: "Rank #1 on Google India. We help Indian startups and enterprises dominate organic search, drive high-intent traffic, and scale revenue.",
    url: "https://kazzona.com/services/seo",
    siteName: "Kazzona Marketing Agency",
    images: [{ url: "https://kazzona.com/icon.svg", width: 1200, height: 630, alt: "Kazzona SEO Services" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enterprise SEO Services in India | Kazzona Marketing",
    description: "Rank #1 on Google India. We help Indian startups and enterprises dominate organic search, drive high-intent traffic, and scale revenue.",
    images: ["https://kazzona.com/icon.svg"],
    site: "@kazzona",
    creator: "@kazzona",
  },
};

export default async function SEOPage() {
  const config = await getPricingConfig();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Enterprise SEO Services",
              "provider": {
                "@type": "Organization",
                "name": "Kazzona Marketing",
                "url": "https://kazzona.com"
              },
              "description": "Rank #1 on Google India with data-driven SEO campaigns.",
              "areaServed": {
                "@type": "Country",
                "name": "India"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How long does it take to see SEO results in India?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Typically, noticeable traffic improvements take 3-6 months. However, technical fixes often result in quick wins within the first 45 days. SEO is a compounding investment."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Are your backlinks safe from Google penalties?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "100%. We exclusively use white-hat, manual outreach link-building strategies. No PBNs, no spammy directories. We secure links from real Indian and international websites with actual traffic."
                  }
                }
              ]
            }
          ])
        }}
      />
      <SEOClient config={config} />
    </>
  );
}
