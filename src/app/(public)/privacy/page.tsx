import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Kazzona Marketing Privacy Policy — How we collect, use, and protect your personal information.",
  alternates: { canonical: "https://kazzona.com/privacy" },
  openGraph: {
    title: "Privacy Policy | Kazzona Marketing",
    description: "How we collect, use, and protect your personal information.",
    url: "https://kazzona.com/privacy",
    siteName: "Kazzona Marketing",
    images: [{ url: "https://kazzona.com/icon.svg", width: 1200, height: 630, alt: "Kazzona Marketing Privacy Policy" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Kazzona Marketing",
    description: "How we collect, use, and protect your personal information.",
    images: [{ url: "https://kazzona.com/icon.svg", alt: "Kazzona Marketing Privacy Policy" }],
    site: "@kazzona",
    creator: "@kazzona",
  },
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-6 py-24 max-w-4xl">
      <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">Last updated: July 2026</p>

      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary">
        <h2>1. Information We Collect</h2>
        <p>
          When you visit Kazzona Marketing (&quot;kazzona.com&quot;), we may collect personal information that you voluntarily provide, including:
        </p>
        <ul>
          <li>Name, email address, phone number, and company name via contact forms</li>
          <li>Email address via newsletter subscription</li>
          <li>Website URL and service preferences via lead capture forms</li>
          <li>Usage data such as pages visited, referrer, browser type, and device information via analytics cookies</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use the collected information for the following purposes:</p>
        <ul>
          <li>To respond to your inquiries and provide requested services</li>
          <li>To send marketing communications (only if you have opted in)</li>
          <li>To improve our website, services, and user experience</li>
          <li>To track analytics and measure the effectiveness of our campaigns</li>
          <li>To comply with legal obligations</li>
        </ul>

        <h2>3. Data Protection</h2>
        <p>
          We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h2>4. Third-Party Services</h2>
        <p>We may use third-party services that collect information used to identify you:</p>
        <ul>
          <li>Google Analytics — for website usage analytics</li>
          <li>Google Tag Manager — for tag management</li>
          <li>Google Ads — for remarketing and conversion tracking</li>
        </ul>

        <h2>5. Cookies</h2>
        <p>
          Our website uses cookies to enhance your experience. You can choose to disable cookies through your browser settings. Some cookies are essential for the website to function properly.
        </p>

        <h2>6. Data Retention</h2>
        <p>
          We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable law.
        </p>

        <h2>7. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access the personal information we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your personal data</li>
          <li>Opt out of marketing communications at any time</li>
        </ul>

        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at{" "}
          <a href="mailto:official.kazzona@gmail.com">official.kazzona@gmail.com</a> or call{" "}
          <a href="tel:+919999568910">+91 9999568910</a>.
        </p>
      </div>
    </div>
  );
}
