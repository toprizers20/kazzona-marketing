import HomeClient from "./HomeClient";
import LatestBlogsHome from "./LatestBlogsHome";
import { prisma } from "@/lib/db";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const page = await prisma.page.findUnique({
    where: { slug: "home" },
  });

  const title = page?.seoTitle || "Kazzona Marketing | Premium Digital Marketing Agency";
  const description = page?.seoDesc || "Enterprise growth agency focused on lead generation, SEO, branding, and automation.";

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://kazzona.com",
      siteName: "Kazzona Marketing Agency",
      images: [
        {
          url: "https://kazzona.com/icon.svg",
          width: 1200,
          height: 630,
          alt: "Kazzona Marketing Agency - Digital Marketing Agency in Delhi NCR",
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://kazzona.com/icon.svg"],
    site: "@kazzona_marketingagency",
    creator: "@kazzona_marketingagency",
    },
  };

  if (page?.canonicalUrl) {
    metadata.alternates = {
      canonical: page.canonicalUrl,
    };
  } else {
    metadata.alternates = {
      canonical: "https://kazzona.com",
    };
  }

  return metadata;
}

export default async function HomePage() {
  const page = await prisma.page.findUnique({
    where: { slug: "home" },
  });

  return (
    <>
      {page?.schemaMarkup && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: page.schemaMarkup }}
        />
      )}
      {page?.headerScript && (
        <div
          style={{ display: "none" }}
          dangerouslySetInnerHTML={{ __html: page.headerScript }}
        />
      )}
      
      {/* 2026 SGE & EEAT Core Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": "https://kazzona.com/#website",
                "url": "https://kazzona.com",
                "name": "Kazzona Marketing",
                "description": "Performance-driven digital marketing agency in Delhi NCR",
                "publisher": { "@id": "https://kazzona.com/#organization" },
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://kazzona.com/search?q={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@type": "Organization",
                "@id": "https://kazzona.com/#organization",
                "name": "Kazzona Marketing",
                "url": "https://kazzona.com",
                "logo": "https://kazzona.com/logo.png",
                "description": "Kazzona Marketing is a performance-driven digital marketing agency in Delhi NCR specializing in ROI-focused SEO, Ads, and Web Development for enterprise clients.",
                "sameAs": [
                  "https://www.instagram.com/kazzona_marketingagency"
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+91-9999568910",
                  "contactType": "customer service"
                }
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What makes Kazzona different from other marketing agencies in India?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Unlike traditional agencies that focus on vanity metrics like impressions and clicks, we operate as a growth partner. We tie every marketing activity directly to your pipeline and revenue generation. We guarantee transparent reporting and a focus on ROAS."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How long does it take to see results?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "For Paid Ads (Google/Meta), we typically launch campaigns within 7 days and you can see initial lead flow immediately. For SEO and organic growth, significant compounding results usually take 3 to 6 months depending on the competitive landscape."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Do you offer custom pricing packages?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Yes. Every business is unique. While we have standard guidelines, we conduct a thorough discovery call to audit your current digital presence and propose a custom pricing structure based on your specific growth targets."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "Who will be managing my account?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "You will be assigned a dedicated Account Manager along with a team of specialists (SEO experts, Ad buyers, designers) based out of our Delhi NCR office. You will have a direct communication channel via Slack/WhatsApp."
                    }
                  }
                ]
              }
            ]
          })
        }}
      />
      <HomeClient />
      <LatestBlogsHome />
    </>
  );
}
