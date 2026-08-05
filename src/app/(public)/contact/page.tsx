import ContactClient from "./ContactClient";
import { prisma } from "@/lib/db";
import { Metadata } from "next";
import { sanitizeHeaderScript, sanitizeSchemaMarkup } from "@/lib/sanitize";

export async function generateMetadata(): Promise<Metadata> {
  let page = null;
  try {
    page = await prisma.page.findUnique({
      where: { slug: "contact" },
    });
  } catch {
    // DB unavailable — use hardcoded defaults
  }

  const metadata: Metadata = {
    title: page?.seoTitle || "Contact Us | Kazzona Marketing",
    description: page?.seoDesc || "Get in touch with Kazzona Marketing. Book a free 30-minute digital strategy session to scale your business.",
  };

  if (page?.canonicalUrl) {
    metadata.alternates = {
      canonical: page.canonicalUrl,
    };
  } else {
    metadata.alternates = {
      canonical: "https://kazzona.com/contact",
    };
  }

  metadata.openGraph = {
    title: metadata.title as string,
    description: metadata.description as string,
    url: "https://kazzona.com/contact",
    siteName: "Kazzona Marketing Agency",
    images: [{ url: "https://kazzona.com/icon.svg", width: 1200, height: 630, alt: "Contact Kazzona Marketing" }],
    locale: "en_IN",
    type: "website",
  };

  metadata.twitter = {
    card: "summary_large_image" as const,
    title: metadata.title as string,
    description: metadata.description as string,
    images: ["https://kazzona.com/icon.svg"],
    site: "@kazzona",
    creator: "@kazzona",
  };

  return metadata;
}

export default async function ContactPage() {
  let page = null;
  try {
    page = await prisma.page.findUnique({
      where: { slug: "contact" },
    });
  } catch {
    // DB unavailable — render contact form without CMS overrides
  }

  return (
    <>
      {page?.schemaMarkup && sanitizeSchemaMarkup(page.schemaMarkup) && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: sanitizeSchemaMarkup(page.schemaMarkup)! }}
        />
      )}
      {page?.headerScript && sanitizeHeaderScript(page.headerScript) && (
        <div
          style={{ display: "none" }}
          dangerouslySetInnerHTML={{ __html: sanitizeHeaderScript(page.headerScript)! }}
        />
      )}
      <ContactClient />
    </>
  );
}
