// Default header/footer configurations shared between server actions and client components

export const DEFAULT_HEADER_CONFIG = {
  logoText: "Kazzona Marketing",
  logoUrl: "",
  logoHeight: 32,
  logoWidth: 32,
  navigationItems: [
    { label: "Home", href: "/" },
    {
      label: "Services",
      href: "#",
      children: [
        { label: "SEO Optimization", href: "/services/seo" },
        { label: "Website Development", href: "/services/website-development" },
        { label: "Advertisement", href: "/services/advertisement" },
        { label: "Email Marketing", href: "/services/email-marketing" },
        { label: "Graphic Designing", href: "/services/graphic-designing" }
      ]
    },
    { label: "About", href: "/about" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" }
  ],
  ctaText: "Free Strategy Call",
  ctaHref: "/contact"
};

export const DEFAULT_FOOTER_CONFIG = {
  columnsCount: 4,
  columns: [
    {
      title: "Kazzona Marketing",
      type: "text" as const,
      content: "The Best Digital Marketing Agency in Delhi NCR. We help brands scale revenue with data-driven SEO, premium web development, and high-ROI performance marketing strategies."
    },
    {
      title: "Services",
      type: "links" as const,
      links: [
        { label: "SEO Optimization", href: "/services/seo" },
        { label: "Website Development", href: "/services/website-development" },
        { label: "Advertisement", href: "/services/advertisement" },
        { label: "Email Marketing", href: "/services/email-marketing" },
        { label: "Graphic Designing", href: "/services/graphic-designing" }
      ]
    },
    {
      title: "Company",
      type: "links" as const,
      links: [
        { label: "About Us", href: "/about" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Insights & Blog", href: "/blog" },
        { label: "Contact Us", href: "/contact" },
        { label: "All Services", href: "/services" }
      ]
    },
    {
      title: "Get In Touch",
      type: "contact" as const,
      email: "official.kazzona@gmail.com",
      phone: "+91 9999568910",
      address: "Sector 62, Noida, Uttar Pradesh, India 201301",
      socials: [
        { platform: "Twitter", href: "#" },
        { platform: "LinkedIn", href: "#" },
        { platform: "Instagram", href: "#" }
      ]
    }
  ],
  copyrightText: "© 2026 Kazzona Marketing. All rights reserved.",
  bottomLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" }
  ]
};
