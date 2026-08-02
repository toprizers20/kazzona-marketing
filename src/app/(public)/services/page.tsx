import { ServicesEcosystem } from "@/components/sections/homepage/services-ecosystem";
import { prisma } from "@/lib/db";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const page = await prisma.page.findUnique({
    where: { slug: "services" },
  });

  const title = page?.seoTitle || "Our Services | Kazzona Marketing";
  const description = page?.seoDesc || "360° Digital Growth Solutions for organic SEO, performance ads, web development, and email marketing.";

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://kazzona.com/services",
      siteName: "Kazzona Marketing Agency",
      images: [
        {
          url: "https://kazzona.com/icon.svg",
          width: 1200,
          height: 630,
          alt: "Kazzona Marketing Services",
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
      site: "@kazzona",
      creator: "@kazzona",
    },
  };

  if (page?.canonicalUrl) {
    metadata.alternates = {
      canonical: page.canonicalUrl,
    };
  } else {
    metadata.alternates = {
      canonical: "https://kazzona.com/services",
    };
  }

  return metadata;
}

export default async function ServicesPage() {
  const page = await prisma.page.findUnique({
    where: { slug: "services" },
  });

  return (
    <div className="flex flex-col min-h-screen">
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
      <div className="container mx-auto px-6 pt-24 pb-12 max-w-5xl">
        <h1 className="font-heading text-5xl font-bold mb-6 text-foreground">
          Digital Marketing <span className="text-primary">Services</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Comprehensive digital solutions engineered for scale.
        </p>
      </div>
      
      {/* Reusing the homepage services ecosystem component for the hub */}
      <ServicesEcosystem />
    </div>
  );
}
