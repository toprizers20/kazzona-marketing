import Link from "next/link";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";
import FooterNewsletter from "@/components/FooterNewsletter";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

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
        { platform: "Instagram", href: "https://www.instagram.com/kazzona_marketingagency" },
        { platform: "WhatsApp", href: "https://wa.me/919999568910" }
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
                        <Link key={si} href={social.href} className="hover:text-primary transition-colors flex items-center gap-1.5" target="_blank" rel="noopener noreferrer">
                          {social.platform === "WhatsApp" && <WhatsAppIcon className="w-4 h-4" />}
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
