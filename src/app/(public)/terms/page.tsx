import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Kazzona Marketing Terms of Service — Terms and conditions governing the use of our services and website.",
  alternates: { canonical: "https://kazzona.com/terms" },
  openGraph: {
    title: "Terms of Service | Kazzona Marketing",
    description: "Terms and conditions governing the use of our services and website.",
    url: "https://kazzona.com/terms",
    siteName: "Kazzona Marketing",
    images: [{ url: "https://kazzona.com/icon.svg", width: 1200, height: 630, alt: "Kazzona Marketing Terms of Service" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Kazzona Marketing",
    description: "Terms and conditions governing the use of our services and website.",
    images: [{ url: "https://kazzona.com/icon.svg", alt: "Kazzona Marketing Terms of Service" }],
    site: "@kazzona",
    creator: "@kazzona",
  },
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-4xl">
      <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground">Terms of Service</h1>
      <p className="text-muted-foreground mb-8">Last updated: July 2026</p>

      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using Kazzona Marketing (&quot;kazzona.com&quot;) and our services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.
        </p>

        <h2>2. Services</h2>
        <p>
          Kazzona Marketing provides digital marketing services including but not limited to SEO, web development, performance advertising, email marketing, and graphic design. The specific scope, deliverables, and timelines for each service are defined in individual client agreements.
        </p>

        <h2>3. Client Responsibilities</h2>
        <p>Clients are responsible for:</p>
        <ul>
          <li>Providing accurate and timely information required for service delivery</li>
          <li>Timely review and approval of deliverables</li>
          <li>Maintaining confidentiality of account credentials</li>
          <li>Ensuring that provided content does not infringe upon third-party rights</li>
        </ul>

        <h2>4. Payment Terms</h2>
        <p>
          Payment terms are specified in individual client agreements. Late payments may result in suspension of services. All prices are exclusive of applicable taxes unless stated otherwise.
        </p>

        <h2>5. Intellectual Property</h2>
        <p>
          Upon full payment, clients receive ownership of all deliverables created specifically for them. Kazzona Marketing retains the right to showcase work in portfolio and case studies unless otherwise agreed in writing.
        </p>

        <h2>6. Confidentiality</h2>
        <p>
          Both parties agree to maintain confidentiality of proprietary information shared during the course of the engagement. This includes business strategies, financial data, and technical information.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          Kazzona Marketing shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services. Our total liability shall not exceed the total amount paid by the client for the specific service giving rise to the claim.
        </p>

        <h2>8. Termination</h2>
        <p>
          Either party may terminate the agreement with 30 days written notice. Early termination fees may apply as specified in the client agreement.
        </p>

        <h2>9. Website Content</h2>
        <p>
          The content on this website, including text, graphics, logos, and images, is the property of Kazzona Marketing and is protected by applicable intellectual property laws. Unauthorized reproduction or distribution is prohibited.
        </p>

        <h2>10. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting on this page. Your continued use of our website and services constitutes acceptance of the modified terms.
        </p>

        <h2>11. Contact</h2>
        <p>
          For questions about these Terms of Service, contact us at{" "}
          <a href="mailto:official.kazzona@gmail.com">official.kazzona@gmail.com</a> or call{" "}
          <a href="tel:+919999568910">+91 9999568910</a>.
        </p>
      </div>
    </div>
  );
}
