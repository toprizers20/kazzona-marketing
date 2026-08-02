import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { cookies } from "next/headers";
import { getHeaderFooterConfig } from "@/app/actions/header-footer";
import { OfferPopup } from "@/components/ui/OfferPopup";
import NewsletterSignup from "@/components/NewsletterSignup";
export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has("admin_token");
  
  // Fetch dynamic header/footer configuration from DB
  const { header, footer } = await getHeaderFooterConfig();

  return (
    <div className="flex flex-col min-h-screen relative noise-overlay">
      <AnalyticsTracker />
      <Header isLoggedIn={isLoggedIn} config={header} />
      <main className="flex-1 pt-[88px]">{children}</main>
      <div className="container mx-auto px-6 py-16 max-w-5xl">
        <NewsletterSignup />
      </div>
      <Footer config={footer} />
      <OfferPopup />
    </div>
  );
}
