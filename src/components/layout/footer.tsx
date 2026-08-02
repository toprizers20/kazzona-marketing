import Link from "next/link";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import FooterNewsletter from "@/components/FooterNewsletter";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  type: "text" | "links" | "contact";
  content?: string;
  links?: FooterLink[];
  email?: string;
  phone?: string;
  address?: string;
  socials?: { platform: string; href: string }[];
}

interface FooterConfigProps {
  columnsCount: number;
  columns: FooterColumn[];
  copyrightText: string;
  bottomLinks: FooterLink[];
}

export function Footer({ config }: { config?: FooterConfigProps }) {
  const currentYear = new Date().getFullYear();

  // Merge dynamic config with defaults
  const columnsCount = config?.columnsCount || 4;
  const copyrightText = config?.copyrightText || `© ${currentYear} Kazzona Marketing. All rights reserved.`;
  const bottomLinks = config?.bottomLinks || [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" }
  ];
  const columns = config?.columns || [
    {
      title: "Kazzona Marketing",
      type: "text",
      content: "The Best Digital Marketing Agency in Delhi NCR. We help brands scale revenue with data-driven SEO, premium web development, and high-ROI performance marketing strategies."
    },
    {
      title: "Services",
      type: "links",
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
      type: "links",
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
      type: "contact",
      email: "official.kazzona@gmail.com",
      phone: "+91 9999568910",
      address: "Sector 62, Noida, Uttar Pradesh, India 201301",
      socials: [
        { platform: "Instagram", href: "https://www.instagram.com/kazzona_marketingagency" }
      ]
    }
  ];

  // Map column count to Tailwind grid classes
  const gridColsClasses: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-5",
  };

  const gridClass = gridColsClasses[columnsCount] || "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";

  return (
    <footer className="bg-card/50 border-t border-border mt-24">
      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <div className={`grid ${gridClass} gap-12 lg:gap-8`}>
          
          {columns.map((col, idx) => (
            <div key={idx} className="flex flex-col">
              
              {/* Render Text / Logo column */}
              {col.type === "text" && (
                <div className="flex flex-col gap-6">
                  <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                      {col.title ? col.title.charAt(0) : "D"}
                    </div>
                    <span className="font-heading font-bold text-xl tracking-tight text-foreground">
                      {col.title}
                    </span>
                  </Link>
                  <p className="text-muted-foreground leading-relaxed max-w-sm text-sm">
                    {col.content}
                  </p>
                  <FooterNewsletter />
                </div>
              )}

              {/* Render Link lists column */}
              {col.type === "links" && (
                <div className="flex flex-col gap-4">
                  <h3 className="font-heading font-semibold text-foreground text-sm uppercase tracking-wider">{col.title}</h3>
                  <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                    {col.links?.map((link, li) => (
                      <li key={li}>
                        <Link href={link.href} className="hover:text-primary transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Render Contacts & Social links column */}
              {col.type === "contact" && (
                <div className="flex flex-col gap-4">
                  <h3 className="font-heading font-semibold text-foreground text-sm uppercase tracking-wider">{col.title}</h3>
                  <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                    {col.email && (
                      <li className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary shrink-0" />
                        {col.email}
                      </li>
                    )}
                    {col.phone && (
                      <li className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary shrink-0" />
                        {col.phone}
                      </li>
                    )}
                    {col.address && (
                      <li className="flex items-start gap-2 mt-2">
                        <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{col.address}</span>
                      </li>
                    )}
                  </ul>
                  {col.socials && col.socials.length > 0 && (
                    <div className="flex items-center gap-4 mt-4 text-muted-foreground font-semibold text-sm">
                      {col.socials.map((social, si) => (
                        <Link key={si} href={social.href} className="hover:text-primary transition-colors">
                          {social.platform}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          ))}

        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>{copyrightText}</p>
          <div className="flex items-center gap-6">
            {bottomLinks.map((link, idx) => (
              <Link key={idx} href={link.href} className="hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
