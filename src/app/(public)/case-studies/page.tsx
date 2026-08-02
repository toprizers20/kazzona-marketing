import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/data/case-studies";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Explore how we've helped industry leaders like SBI, LIC, Tata Capital, and ABB transform their digital presence and achieve measurable business results.",
  alternates: {
    canonical: "https://kazzona.com/case-studies",
  },
  openGraph: {
    title: "Case Studies | Kazzona Marketing",
    description:
      "Real results from real partnerships. See how we drive digital growth for India's top enterprises.",
    url: "https://kazzona.com/case-studies",
    siteName: "Kazzona Marketing",
    images: [{ url: "https://kazzona.com/icon.svg", width: 1200, height: 630, alt: "Kazzona Marketing Case Studies" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | Kazzona Marketing",
    description: "Real results from real partnerships. See how we drive digital growth for India's top enterprises.",
    images: [{ url: "https://kazzona.com/icon.svg", alt: "Kazzona Marketing Case Studies" }],
    site: "@kazzona",
    creator: "@kazzona",
  },
};

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://kazzona.com" },
              { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://kazzona.com/case-studies" },
            ],
          }),
        }}
      />

      {/* JSON-LD ItemList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Kazzona Marketing Case Studies",
            description: "Digital transformation case studies of our clients",
            numberOfItems: caseStudies.length,
            itemListElement: caseStudies.map((cs, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://kazzona.com/case-studies/${cs.slug}`,
              name: `${cs.company} - ${cs.tagline}`,
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-orange-50/80 to-white">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          <span className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-4 block">
            Our Work
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5 font-heading">
            Case Studies
          </h1>
          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Real results from real partnerships. See how we&apos;ve helped
            India&apos;s top enterprises transform their digital presence and
            achieve measurable growth.
          </p>
        </div>
      </section>

      {/* Listing Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="group block"
              >
                <div className="flex flex-col h-full bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all duration-500 hover:-translate-y-1">
                  {/* Logo area */}
                  <div className="flex items-center justify-center h-56 bg-gradient-to-br from-gray-50 to-white border-b border-gray-50 px-6">
                    <Image
                      src={cs.logo}
                      alt={cs.company}
                      width={220}
                      height={110}
                      quality={100}
                      unoptimized
                      style={{ width: "auto", maxHeight: "110px" }}
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <span className="text-[10px] font-bold text-orange-500 tracking-wider uppercase mb-2 block">
                      {cs.industry}
                    </span>
                    <h2 className="font-heading text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                      {cs.company}
                    </h2>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed flex-grow">
                      {cs.tagline}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-orange-500 pt-3 border-t border-gray-50">
                      View Case Study
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
