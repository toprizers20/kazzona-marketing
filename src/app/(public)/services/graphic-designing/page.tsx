import { getPricingConfig } from "@/app/actions/pricing";
import GraphicDesigningClient from "./GraphicDesigningClient";

export const metadata = {
  title: "Premium Graphic Design & Branding | Kazzona Marketing",
  description: "Enterprise-grade UI/UX, branding, and ad creatives for Indian startups and D2C brands. Elevate your visual identity.",
  alternates: {
    canonical: "https://kazzona.com/services/graphic-designing",
  },
  openGraph: {
    title: "Premium Graphic Design & Branding | Kazzona Marketing",
    description: "Enterprise-grade UI/UX, branding, and ad creatives for Indian startups and D2C brands. Elevate your visual identity.",
    url: "https://kazzona.com/services/graphic-designing",
    siteName: "Kazzona Marketing Agency",
    images: [{ url: "https://kazzona.com/icon.svg", width: 1200, height: 630, alt: "Kazzona Graphic Design" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Graphic Design & Branding | Kazzona Marketing",
    description: "Enterprise-grade UI/UX, branding, and ad creatives for Indian startups and D2C brands. Elevate your visual identity.",
    images: ["https://kazzona.com/icon.svg"],
    site: "@kazzona",
    creator: "@kazzona",
  },
};

export default async function GraphicDesigningPage() {
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
              "name": "Premium Graphic Design & Branding",
              "provider": {
                "@type": "Organization",
                "name": "Kazzona Marketing",
                "url": "https://kazzona.com"
              },
              "description": "Enterprise-grade UI/UX, branding, and ad creatives for Indian startups and D2C brands. Elevate your visual identity.",
              "serviceType": "Graphic Design, UI/UX Design, Branding, Ad Creatives",
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
                  "name": "What graphic design services do you offer?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We offer complete brand identity design, UI/UX for web and mobile apps, ad creatives for Google/Meta campaigns, social media content design, presentation design, and print collateral."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long does a typical branding project take?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "A complete brand identity project typically takes 2-3 weeks. UI/UX design for a website takes 1-2 weeks depending on the number of pages. Rush delivery is available for urgent projects."
                  }
                }
              ]
            }
          ])
        }}
      />
      <GraphicDesigningClient config={config} />
    </>
  );
}
