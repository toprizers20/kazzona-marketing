import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  caseStudies,
  getCaseStudyBySlug,
  getAdjacentCaseStudies,
} from "@/data/case-studies";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  TrendingUp,
  ChevronRight,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) return { title: "Case Study Not Found" };

  return {
    title: `${cs.company} Case Study`,
    description: cs.tagline,
    alternates: {
      canonical: `https://kazzona.com/case-studies/${cs.slug}`,
    },
    openGraph: {
      title: `${cs.company} Case Study | Kazzona Marketing`,
      description: cs.tagline,
      url: `https://kazzona.com/case-studies/${cs.slug}`,
      siteName: "Kazzona Marketing",
      images: [{ url: "https://kazzona.com/icon.svg", width: 1200, height: 630, alt: `${cs.company} Case Study` }],
      locale: "en_IN",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${cs.company} Case Study | Kazzona Marketing`,
      description: cs.tagline,
      images: [{ url: "https://kazzona.com/icon.svg", alt: `${cs.company} Case Study` }],
      site: "@kazzona",
      creator: "@kazzona",
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const { prev, next } = getAdjacentCaseStudies(slug);

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
              { "@type": "ListItem", position: 3, name: cs.company, item: `https://kazzona.com/case-studies/${cs.slug}` },
            ],
          }),
        }}
      />

      {/* JSON-LD Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${cs.company} - ${cs.tagline}`,
            description: cs.problem,
            author: { "@type": "Organization", name: "Kazzona Marketing", url: "https://kazzona.com" },
            publisher: { "@type": "Organization", name: "Kazzona Marketing", url: "https://kazzona.com" },
            mainEntityOfPage: { "@type": "WebPage", "@id": `https://kazzona.com/case-studies/${cs.slug}` },
          }),
        }}
      />

      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-7xl py-3">
          <nav className="flex items-center gap-2 text-xs text-gray-400">
            <Link href="/" className="hover:text-orange-500 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              href="/case-studies"
              className="hover:text-orange-500 transition-colors"
            >
              Case Studies
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-700 font-medium">{cs.company}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-orange-50/60 to-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Logo */}
            <div className="shrink-0 w-48 h-32 md:w-56 md:h-36 flex items-center justify-center bg-white rounded-2xl border border-gray-100 shadow-sm px-6">
              <Image
                src={cs.logo}
                alt={cs.company}
                width={160}
                height={80}
                quality={100}
                unoptimized
                style={{ width: "auto", maxHeight: "72px" }}
                className="object-contain"
              />
            </div>

            {/* Text */}
            <div>
              <span className="text-[10px] font-bold text-orange-500 tracking-wider uppercase mb-2 block">
                {cs.industry}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-heading mb-3">
                {cs.company}
              </h1>
              <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-xl">
                {cs.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 border-y border-gray-100 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {cs.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-orange-500 font-heading">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-400 mt-1 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem & Challenge */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Problem */}
            <div>
              <span className="text-[10px] font-bold text-orange-500 tracking-wider uppercase mb-3 block">
                The Problem
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 font-heading mb-4">
                What They Were Facing
              </h2>
              <p className="text-gray-500 leading-relaxed text-[15px]">
                {cs.problem}
              </p>
            </div>

            {/* Challenge */}
            <div>
              <span className="text-[10px] font-bold text-orange-500 tracking-wider uppercase mb-3 block">
                The Challenge
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 font-heading mb-4">
                Why It Mattered
              </h2>
              <p className="text-gray-500 leading-relaxed text-[15px]">
                {cs.challenge}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-5xl">
          <span className="text-[10px] font-bold text-orange-500 tracking-wider uppercase mb-3 block">
            Our Approach
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 font-heading mb-4">
            How We Solved It
          </h2>
          <p className="text-gray-500 leading-relaxed text-[15px] mb-8 max-w-3xl">
            {cs.solution}
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {cs.solutionPoints.map((point, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white rounded-xl p-5 border border-gray-100"
              >
                <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-gray-600 text-sm leading-relaxed">
                  {point}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          <span className="text-[10px] font-bold text-orange-500 tracking-wider uppercase mb-3 block">
            The Results
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 font-heading mb-8">
            Measurable Impact
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {cs.results.map((result, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-gradient-to-br from-orange-50/80 to-white rounded-xl p-5 border border-orange-100/50"
              >
                <TrendingUp className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <span className="text-gray-700 text-sm font-medium leading-relaxed">
                  {result}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next / Prev Navigation */}
      <section className="py-12 border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Previous */}
            <Link
              href={`/case-studies/${prev.slug}`}
              className="group flex items-center gap-4 p-5 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/40 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-gray-300 group-hover:text-orange-500 transition-colors shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase block mb-1">
                  Previous
                </span>
                <span className="text-sm font-bold text-gray-900 group-hover:text-orange-500 transition-colors truncate block">
                  {prev.company}
                </span>
              </div>
              <div className="shrink-0 ml-auto w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-orange-100 transition-colors">
                <Image
                  src={prev.logo}
                  alt={prev.company}
                  width={28}
                  height={28}
                  quality={100}
                  unoptimized
                  style={{ width: "auto", maxHeight: "20px" }}
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Next */}
            <Link
              href={`/case-studies/${next.slug}`}
              className="group flex items-center gap-4 p-5 rounded-2xl border border-gray-100 hover:border-orange-200 hover:bg-orange-50/40 transition-all md:justify-end md:text-right"
            >
              <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-orange-100 transition-colors order-2 md:order-1">
                <Image
                  src={next.logo}
                  alt={next.company}
                  width={28}
                  height={28}
                  quality={100}
                  unoptimized
                  style={{ width: "auto", maxHeight: "20px" }}
                  className="object-contain"
                />
              </div>
              <div className="min-w-0 order-1 md:order-2">
                <span className="text-[10px] font-bold text-gray-400 tracking-wider uppercase block mb-1">
                  Next
                </span>
                <span className="text-sm font-bold text-gray-900 group-hover:text-orange-500 transition-colors truncate block">
                  {next.company}
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-orange-500 transition-colors shrink-0 order-3" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
