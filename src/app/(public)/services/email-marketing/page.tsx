import { getPricingConfig } from "@/app/actions/pricing";
import EmailMarketingClient from "./EmailMarketingClient";

export const metadata = {
  title: "Email Marketing Services in India | Kazzona Marketing",
  description: "Generate up to 30% of your total revenue from automated email flows. Klaviyo & Mailchimp experts for Indian D2C and B2B brands.",
  alternates: {
    canonical: "https://kazzona.com/services/email-marketing",
  },
  openGraph: {
    title: "Email Marketing Services in India | Kazzona Marketing",
    description: "Generate up to 30% of your total revenue from automated email flows. Klaviyo & Mailchimp experts for Indian D2C and B2B brands.",
    url: "https://kazzona.com/services/email-marketing",
    siteName: "Kazzona Marketing Agency",
    images: [{ url: "https://kazzona.com/icon.svg", width: 1200, height: 630, alt: "Kazzona Email Marketing" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Email Marketing Services in India | Kazzona Marketing",
    description: "Generate up to 30% of your total revenue from automated email flows. Klaviyo & Mailchimp experts for Indian D2C and B2B brands.",
    images: ["https://kazzona.com/icon.svg"],
    site: "@kazzona",
    creator: "@kazzona",
  },
};

export default async function EmailMarketingPage() {
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
              "name": "Email Marketing & Automation",
              "provider": {
                "@type": "Organization",
                "name": "Kazzona Marketing",
                "url": "https://kazzona.com"
              },
              "description": "Generate up to 30% of your total revenue from automated email flows. Klaviyo & Mailchimp experts for Indian D2C and B2B brands.",
              "serviceType": "Email Marketing, Klaviyo Automation, Newsletter Management",
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
                  "name": "How much revenue can email marketing generate?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Well-optimized email marketing can generate up to 30% of your total revenue. Automated flows like welcome series, cart abandonment, and post-purchase sequences are the biggest revenue drivers."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Which email platform do you work with?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We work with all major platforms including Klaviyo, Mailchimp, ActiveCampaign, and Brevo. We recommend the best platform based on your business model and budget."
                  }
                }
              ]
            }
          ])
        }}
      />
      <EmailMarketingClient config={config} />
    </>
  );
}
