import { getPricingConfig } from "@/app/actions/pricing";
import AdvertisementClient from "./AdvertisementClient";

export const metadata = {
  title: "Performance Advertising in India | Kazzona Marketing",
  description: "Stop burning ad spend. We manage ₹2Cr+ in monthly ad spend across Google, Meta, and LinkedIn for Indian brands with a focus on pure ROAS.",
  alternates: {
    canonical: "https://kazzona.com/services/advertisement",
  },
  openGraph: {
    title: "Performance Advertising in India | Kazzona Marketing",
    description: "Stop burning ad spend. We manage ₹2Cr+ in monthly ad spend across Google, Meta, and LinkedIn for Indian brands with a focus on pure ROAS.",
    url: "https://kazzona.com/services/advertisement",
    siteName: "Kazzona Marketing Agency",
    images: [{ url: "https://kazzona.com/icon.svg", width: 1200, height: 630, alt: "Kazzona Performance Advertising" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Performance Advertising in India | Kazzona Marketing",
    description: "Stop burning ad spend. We manage ₹2Cr+ in monthly ad spend across Google, Meta, and LinkedIn for Indian brands with a focus on pure ROAS.",
    images: ["https://kazzona.com/icon.svg"],
    site: "@kazzona",
    creator: "@kazzona",
  },
};

export default async function AdvertisementPage() {
  const config = await getPricingConfig();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Performance Advertising & Media Buying",
            "provider": {
              "@type": "Organization",
              "name": "Kazzona Marketing",
              "url": "https://kazzona.com"
            },
            "description": "Stop burning ad spend. We manage ₹2Cr+ in monthly ad spend across Google, Meta, and LinkedIn for Indian brands with a focus on pure ROAS.",
            "serviceType": "Google Ads, Meta Ads, LinkedIn Ads, PPC",
            "areaServed": {
              "@type": "Country",
              "name": "India"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What advertising services does Kazzona Marketing offer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We offer Google Ads, Meta Ads, LinkedIn Ads, and complete PPC management services. Our team handles campaign strategy, creative development, bid management, and performance optimization to maximize your return on ad spend."
                }
              },
              {
                "@type": "Question",
                "name": "How much ad spend do you manage?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We currently manage over ₹2 Crore in monthly ad spend across Google, Meta, and LinkedIn platforms for Indian brands ranging from startups to large enterprises."
                }
              }
            ]
          })
        }}
      />
      <AdvertisementClient config={config} />
    </>
  );
}
