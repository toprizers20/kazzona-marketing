import Link from "next/link";
import { CheckCircle2, Users, Target, Award, Heart, Lightbulb, Rocket, MapPin, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import TimelineAnimation from "@/components/TimelineAnimation";

import { prisma } from "@/lib/db";
import { Metadata } from "next";
import { sanitizeSchemaMarkup, sanitizeHeaderScript } from "@/lib/sanitize";

export async function generateMetadata(): Promise<Metadata> {
  let page = null;
  try {
    page = await prisma.page.findUnique({
      where: { slug: "about" },
    });
  } catch {
    // DB unavailable — use hardcoded defaults
  }

  const title = page?.seoTitle || "About Us | Kazzona Marketing — Best Digital Marketing Agency in Delhi NCR";
  const description = page?.seoDesc || "Learn about Kazzona Marketing, the best digital marketing agency in Delhi NCR focused on SEO, Ads, and Web Development.";

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://kazzona.com/about",
      siteName: "Kazzona Marketing Agency",
      images: [
        {
          url: "https://kazzona.com/icon.svg",
          width: 1200,
          height: 630,
          alt: "About Kazzona Marketing Agency",
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
      canonical: "https://kazzona.com/about",
    };
  }

  return metadata;
}

const team = [
  { name: "Vikram Malhotra", role: "Founder & CEO", bio: "15+ years in digital marketing. Ex-Google. Built and scaled 3 agencies before founding Kazzona." },
  { name: "Sneha Kapoor", role: "Head of SEO", bio: "Ranked 500+ keywords on Page 1 of Google India. Specialist in E-commerce & SaaS SEO." },
  { name: "Arjun Reddy", role: "Lead Developer", bio: "Full-stack engineer specializing in React, Next.js, and high-performance web applications." },
  { name: "Meera Singh", role: "Creative Director", bio: "Award-winning designer with 10+ years of experience in brand identity and UI/UX." },
  { name: "Rohit Joshi", role: "Head of Paid Media", bio: "Managed ₹50Cr+ in ad spend across Google, Meta, and LinkedIn. ROAS optimization expert." },
  { name: "Ananya Gupta", role: "Email Marketing Lead", bio: "Klaviyo certified. Built automated flows generating ₹5Cr+ in annual email revenue for clients." },
];

const milestones = [
  { year: "2019", title: "Founded in Noida", desc: "Started with 3 team members and a mission to make premium digital marketing accessible to Indian startups." },
  { year: "2020", title: "First ₹1Cr Revenue Milestone", desc: "Helped our first client cross ₹1Cr in annual revenue through organic SEO within 8 months." },
  { year: "2021", title: "Team of 20+", desc: "Expanded our team to 20+ specialists across SEO, PPC, design, and development." },
  { year: "2022", title: "100+ Clients", desc: "Crossed the 100-client milestone, serving industries from D2C to SaaS to Healthcare." },
  { year: "2023", title: "Google Premier Partner", desc: "Achieved Google Premier Partner status, placing us in the top 3% of agencies in India." },
  { year: "2024", title: "₹100Cr+ Revenue Generated", desc: "Collectively generated over ₹100Cr in revenue for our clients through digital channels." },
];

export default async function AboutPage() {
  let page = null;
  try {
    page = await prisma.page.findUnique({
      where: { slug: "about" },
    });
  } catch {
    // DB unavailable — page body is fully hardcoded, no CMS overrides
  }

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Kazzona Marketing",
    "description": "Learn about Kazzona Marketing, the best digital marketing agency in Delhi NCR.",
    "url": "https://kazzona.com/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Kazzona Marketing",
      "url": "https://kazzona.com",
      "logo": "https://kazzona.com/icon.svg",
      "foundingDate": "2019",
      "founders": [
        {
          "@type": "Person",
          "name": "Vikram Malhotra"
        }
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "A-45, Sector 62",
        "addressLocality": "Noida",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "201301",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9999568910",
        "contactType": "customer service"
      },
      "sameAs": [
        "https://www.instagram.com/kazzona_marketingagency"
      ]
    }
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
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
      {/* SECTION 1: Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.15),transparent)] -z-10" />
        <div className="container mx-auto px-6 max-w-5xl text-center animate-fade-down">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-semibold text-primary mb-6">
            <Heart className="w-4 h-4" /> Our Story
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            About Kazzona Marketing —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">We Engineer Growth.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Founded in 2019, Kazzona Marketing has grown from a 3-person startup in Noida to the top digital marketing agency in Delhi NCR — serving 200+ clients across 15 industries globally.
          </p>
        </div>
      </section>

      {/* SECTION 2: Mission & Vision */}
      <section className="py-20 bg-card/30 border-y border-border/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-10 rounded-3xl bg-card border border-border/50 animate-slide-left">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To democratize premium digital marketing for businesses in Delhi and beyond. Whether you&apos;re a bootstrapped D2C startup or an enterprise SaaS company, you deserve a growth partner that treats your money like their own. Every strategy we build is rooted in data, every campaign is optimized for ROI, and every rupee you invest is tracked to its outcome.
              </p>
            </div>
            <div className="p-10 rounded-3xl bg-card border border-border/50 animate-slide-right">
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                <Lightbulb className="w-7 h-7 text-accent" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To become the most trusted digital growth partner for growing businesses by 2027. We envision a future where every ambitious brand — regardless of its size — has access to world-class SEO, advertising, and web development expertise that was previously reserved for Fortune 500 companies with million-dollar budgets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Stats */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-scale-up">
            {[
              { number: "200+", label: "Happy Clients", icon: Users },
              { number: "₹100Cr+", label: "Revenue Generated", icon: Rocket },
              { number: "50+", label: "Team Members", icon: Heart },
              { number: "15+", label: "Industries Served", icon: Award },
            ].map((stat, i) => (
              <div key={i} className="p-8 rounded-3xl bg-card border border-border/50 text-center hover:border-primary/30 transition-colors">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{stat.number}</div>
                <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Our Values */}
      <section className="py-20 bg-card/30 border-y border-border/50">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 animate-fade-down">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Core Values</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">These principles guide every decision we make and every campaign we run.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 animate-slide-bl" style={{ animationDelay: "0.1s" }}>
            {[
              { title: "Data Over Opinions", desc: "We don't guess. Every strategy is backed by data, analytics, and proven market insights. If the data says pivot, we pivot.", icon: "📊" },
              { title: "Transparency Always", desc: "No hidden fees, no vanity metrics, no BS. You get real-time dashboards, honest reporting, and direct access to your dedicated team.", icon: "🔍" },
              { title: "Client-First Obsession", desc: "Your success is our success. We celebrate your revenue milestones, not just our own. Our 98% client retention rate proves this isn't lip service.", icon: "🤝" },
              { title: "Innovation Driven", desc: "From AI-powered content generation to programmatic SEO — we stay ahead of the curve so our clients are always one step ahead of their competitors.", icon: "💡" },
              { title: "Local & Global Expertise", desc: "We understand the unique buying behavior of consumers in Delhi NCR as well as national and international markets.", icon: "🌍" },
              { title: "Long-Term Partnerships", desc: "We don't do one-off projects. We build long-term relationships because real growth takes time, trust, and consistent execution.", icon: "🏆" },
            ].map((value, i) => (
              <div key={i} className="p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/30 transition-colors">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: Team */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16 animate-fade-down">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold mb-4 uppercase tracking-wider">The People</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Meet Our Leadership</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">50+ passionate marketers, developers, and designers — all based in India, all obsessed with growth.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 animate-slide-br" style={{ animationDelay: "0.1s" }}>
            {team.map((member, i) => (
              <div key={i} className="p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/30 transition-colors group">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold mb-6 group-hover:scale-110 transition-transform">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-lg font-bold">{member.name}</h3>
                <p className="text-sm text-primary font-semibold mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: Timeline */}
      <section className="py-24 bg-card/30 border-y border-border/50">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16 animate-fade-down">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Journey</h2>
            <p className="text-muted-foreground text-lg">From a small room in Noida to serving 200+ brands across India.</p>
          </div>
          <TimelineAnimation />
        </div>
      </section>

      {/* SECTION 7: Office / Location */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center animate-slide-left">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 uppercase tracking-wider">Visit Us</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Office</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                We operate from the heart of India&apos;s tech hub — Sector 62, Noida. Our modern workspace houses 50+ digital specialists who collaborate daily to deliver exceptional results for our clients.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <div className="font-bold">Kazzona Marketing HQ</div>
                    <div className="text-sm text-muted-foreground">A-45, Sector 62, Noida<br />Uttar Pradesh, India 201301</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="text-sm">Open Monday–Saturday, 10:00 AM – 7:00 PM IST</span>
                </div>
              </div>
            </div>
            <div className="aspect-video rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border/50 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary/30 mx-auto mb-4" />
                <p className="text-muted-foreground font-medium">Noida, India</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internal Links - Services */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/services/seo" className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
              <h3 className="font-semibold text-lg mb-2">SEO Optimization</h3>
              <p className="text-sm text-muted-foreground">Rank #1 on Google India</p>
            </Link>
            <Link href="/services/website-development" className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
              <h3 className="font-semibold text-lg mb-2">Website Development</h3>
              <p className="text-sm text-muted-foreground">Premium custom websites</p>
            </Link>
            <Link href="/services/advertisement" className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
              <h3 className="font-semibold text-lg mb-2">Advertisement</h3>
              <p className="text-sm text-muted-foreground">Google & Meta Ads</p>
            </Link>
            <Link href="/services/email-marketing" className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
              <h3 className="font-semibold text-lg mb-2">Email Marketing</h3>
              <p className="text-sm text-muted-foreground">Automated revenue flows</p>
            </Link>
            <Link href="/services/graphic-designing" className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors">
              <h3 className="font-semibold text-lg mb-2">Graphic Designing</h3>
              <p className="text-sm text-muted-foreground">Premium branding & UI/UX</p>
            </Link>
            <Link href="/contact" className="p-6 rounded-xl bg-primary/10 border border-primary/30 hover:bg-primary/20 transition-colors">
              <h3 className="font-semibold text-lg mb-2 text-primary">Get Started</h3>
              <p className="text-sm text-muted-foreground">Free strategy call</p>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 8: CTA */}
      <section className="py-24">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <div className="p-16 rounded-[3rem] bg-gradient-to-r from-primary via-orange-500 to-accent text-white relative overflow-hidden shadow-2xl animate-fade-up">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 relative z-10">Want to Join Our Growth Story?</h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto relative z-10">Whether as a client or a team member, there&apos;s a place for you at Kazzona Marketing.</p>
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className={buttonVariants({ variant: "secondary", size: "lg", className: "rounded-full font-bold px-10 text-lg" })}>
                Become a Client <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link href="/contact" className="text-white/90 hover:text-white font-semibold underline underline-offset-4">
                Get in Touch →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
