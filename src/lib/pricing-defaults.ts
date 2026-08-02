// Default pricing configuration — all the user's pricing data

export interface PricingFeature {
  text: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  features: PricingFeature[];
  popular?: boolean;
}

export interface PricingCategory {
  id: string;
  title: string;
  subtitle: string;
  plans: PricingPlan[];
}

export interface PricingSection {
  id: string;
  title: string;
  categories: PricingCategory[];
}

export interface PricingConfig {
  sections: PricingSection[];
  bannerText: string;
  ctaText: string;
  ctaHref: string;
}

export const DEFAULT_PRICING_CONFIG: PricingConfig = {
  sections: [
    {
      id: "website",
      title: "Website Development Pricing",
      categories: [
        {
          id: "cms-website",
          title: "CMS Website (WordPress)",
          subtitle: "Ready-made & customizable WordPress solutions",
          plans: [
            {
              name: "Starter",
              price: "₹6,999",
              features: [
                { text: "4-5 Pages" },
                { text: "Ready Made Premium Theme" },
                { text: "Mobile Friendly" },
                { text: "Contact Form" },
                { text: "WhatsApp Button" },
                { text: "Social Media Links" },
                { text: "Basic SEO Setup" },
                { text: "5-7 Din Delivery" },
                { text: "1 Month Free Support" }
              ]
            },
            {
              name: "Growth",
              price: "₹12,999",
              popular: true,
              features: [
                { text: "7-8 Pages" },
                { text: "Premium Theme Customization" },
                { text: "Mobile + Tablet Friendly" },
                { text: "Inquiry Form" },
                { text: "Google Maps Integration" },
                { text: "WhatsApp Integration" },
                { text: "Speed Optimization" },
                { text: "Basic On-Page SEO" },
                { text: "7-10 Din Delivery" },
                { text: "2 Month Free Support" }
              ]
            },
            {
              name: "Professional",
              price: "₹19,999",
              features: [
                { text: "10-12 Pages" },
                { text: "Fully Customized Premium Theme" },
                { text: "Blog Section" },
                { text: "Advanced On-Page SEO" },
                { text: "Google Analytics Setup" },
                { text: "Speed Optimized" },
                { text: "Contact + Lead Form" },
                { text: "3 Month Free Support" },
                { text: "12-15 Din Delivery" }
              ]
            },
            {
              name: "Enterprise",
              price: "₹34,999",
              features: [
                { text: "Unlimited Pages" },
                { text: "Custom Theme Development" },
                { text: "Advanced Blog + CMS" },
                { text: "Multi Language Support" },
                { text: "Advanced SEO Setup" },
                { text: "Third Party Integrations" },
                { text: "Performance Optimized" },
                { text: "Dedicated Project Manager" },
                { text: "6 Month Free Support" },
                { text: "20-25 Din Delivery" }
              ]
            }
          ]
        },
        {
          id: "custom-coded",
          title: "Custom Coded Website",
          subtitle: "Hand-coded, blazing fast, fully custom",
          plans: [
            {
              name: "Starter",
              price: "₹12,999",
              features: [
                { text: "4-5 Pages" },
                { text: "Hand Coded Design" },
                { text: "Mobile Friendly" },
                { text: "Fast Loading" },
                { text: "Contact Form" },
                { text: "WhatsApp Button" },
                { text: "Basic SEO" },
                { text: "7-10 Din Delivery" },
                { text: "1 Month Free Support" }
              ]
            },
            {
              name: "Growth",
              price: "₹22,999",
              popular: true,
              features: [
                { text: "7-8 Pages" },
                { text: "Fully Custom Design" },
                { text: "Mobile + Tablet Friendly" },
                { text: "Inquiry + Lead Form" },
                { text: "Google Maps Integration" },
                { text: "Speed Optimized" },
                { text: "Basic On-Page SEO" },
                { text: "10-14 Din Delivery" },
                { text: "2 Month Free Support" }
              ]
            },
            {
              name: "Professional",
              price: "₹39,999",
              features: [
                { text: "10-12 Pages" },
                { text: "Premium Custom Design" },
                { text: "Admin Panel" },
                { text: "Blog Section" },
                { text: "Advanced SEO" },
                { text: "Google Analytics Setup" },
                { text: "Third Party API Integration" },
                { text: "Performance Optimized" },
                { text: "3 Month Free Support" },
                { text: "15-20 Din Delivery" }
              ]
            },
            {
              name: "Enterprise",
              price: "₹74,999+",
              features: [
                { text: "Unlimited Pages" },
                { text: "Fully Custom Architecture" },
                { text: "Advanced Admin Panel" },
                { text: "Custom Features" },
                { text: "Multi Language" },
                { text: "Advanced SEO" },
                { text: "Performance Optimized" },
                { text: "Dedicated Project Manager" },
                { text: "6 Month Free Support" },
                { text: "25-35 Din Delivery" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "ecommerce",
      title: "Ecommerce Pricing",
      categories: [
        {
          id: "shopify",
          title: "Shopify",
          subtitle: "Quick launch on Shopify platform",
          plans: [
            {
              name: "Starter",
              price: "₹9,999",
              features: [
                { text: "Upto 50 Products" },
                { text: "Premium Shopify Theme Setup" },
                { text: "Payment Gateway Integration" },
                { text: "Mobile Friendly" },
                { text: "Basic Product Filter" },
                { text: "WhatsApp Integration" },
                { text: "Basic SEO" },
                { text: "5-7 Din Delivery" },
                { text: "1 Month Free Support" },
                { text: "Shopify subscription alag — ₹1,994/month" }
              ]
            },
            {
              name: "Growth",
              price: "₹17,999",
              popular: true,
              features: [
                { text: "Upto 200 Products" },
                { text: "Premium Theme Customization" },
                { text: "Payment Gateway" },
                { text: "Discount + Coupon System" },
                { text: "Product Reviews" },
                { text: "Abandoned Cart" },
                { text: "Basic SEO Setup" },
                { text: "Google Analytics Setup" },
                { text: "10-12 Din Delivery" },
                { text: "2 Month Free Support" },
                { text: "Shopify subscription alag" }
              ]
            },
            {
              name: "Professional",
              price: "₹29,999",
              features: [
                { text: "Unlimited Products" },
                { text: "Fully Customized Shopify Theme" },
                { text: "Advanced Payment Options" },
                { text: "Inventory Management" },
                { text: "Customer Login" },
                { text: "Wishlist Feature" },
                { text: "Advanced SEO" },
                { text: "Meta Pixel + Google Analytics" },
                { text: "Speed Optimized" },
                { text: "15-20 Din Delivery" },
                { text: "3 Month Free Support" },
                { text: "Shopify subscription alag" }
              ]
            }
          ]
        },
        {
          id: "custom-ecommerce",
          title: "Custom Coded Ecommerce",
          subtitle: "Fully custom-built online store",
          plans: [
            {
              name: "Starter",
              price: "₹19,999",
              features: [
                { text: "Upto 100 Products" },
                { text: "Custom Design" },
                { text: "Payment Gateway Integration" },
                { text: "Mobile Friendly" },
                { text: "Order Management" },
                { text: "Basic SEO" },
                { text: "WhatsApp Order Button" },
                { text: "14-20 Din Delivery" },
                { text: "1 Month Free Support" }
              ]
            },
            {
              name: "Growth",
              price: "₹34,999",
              popular: true,
              features: [
                { text: "Upto 500 Products" },
                { text: "Premium Custom Design" },
                { text: "Multiple Payment Options" },
                { text: "Coupon + Discount System" },
                { text: "Inventory Management" },
                { text: "Customer Login Panel" },
                { text: "Product Reviews" },
                { text: "Advanced SEO" },
                { text: "Google Analytics + Pixel" },
                { text: "25-30 Din Delivery" },
                { text: "2 Month Free Support" }
              ]
            },
            {
              name: "Professional",
              price: "₹59,999",
              features: [
                { text: "Unlimited Products" },
                { text: "Fully Custom Design" },
                { text: "Advanced Inventory" },
                { text: "Multi Payment Gateway" },
                { text: "Customer Wishlist" },
                { text: "Abandoned Cart System" },
                { text: "Advanced SEO" },
                { text: "Speed Optimized" },
                { text: "Third Party Integration" },
                { text: "35-45 Din Delivery" },
                { text: "3 Month Free Support" }
              ]
            },
            {
              name: "Enterprise",
              price: "₹99,999+",
              features: [
                { text: "Unlimited Products" },
                { text: "Multi Vendor Support" },
                { text: "ERP Integration" },
                { text: "Custom Features" },
                { text: "Advanced Analytics" },
                { text: "Performance Marketing Ready" },
                { text: "Dedicated Project Manager" },
                { text: "45-60 Din Delivery" },
                { text: "6 Month Free Support" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "seo",
      title: "SEO Services Pricing",
      categories: [
        {
          id: "local-seo",
          title: "Local SEO",
          subtitle: "For local businesses targeting city-level searches",
          plans: [
            {
              name: "Starter",
              price: "₹4,999/mo",
              features: [
                { text: "5-10 Keywords" },
                { text: "Google My Business Setup + Optimization" },
                { text: "On-Page SEO (5 Pages)" },
                { text: "Basic Link Building" },
                { text: "Monthly Report" },
                { text: "3 Month Minimum Contract" }
              ]
            },
            {
              name: "Growth",
              price: "₹8,999/mo",
              popular: true,
              features: [
                { text: "15-20 Keywords" },
                { text: "Google My Business Management" },
                { text: "On-Page SEO (10 Pages)" },
                { text: "Citation Building" },
                { text: "Basic Content Writing (2 Blogs)" },
                { text: "Competitor Analysis" },
                { text: "Monthly Report" },
                { text: "3 Month Minimum Contract" }
              ]
            },
            {
              name: "Professional",
              price: "₹14,999/mo",
              features: [
                { text: "30+ Keywords" },
                { text: "Complete GMB Management" },
                { text: "On-Page + Technical SEO" },
                { text: "Advanced Link Building" },
                { text: "Content Writing (4 Blogs)" },
                { text: "Competitor Tracking" },
                { text: "Weekly Updates" },
                { text: "Monthly Detailed Report" },
                { text: "6 Month Minimum Contract" }
              ]
            }
          ]
        },
        {
          id: "national-seo",
          title: "National SEO",
          subtitle: "Medium businesses jo poore India mein rank karna chahte hain",
          plans: [
            {
              name: "Starter",
              price: "₹9,999/mo",
              features: [
                { text: "10-15 Keywords" },
                { text: "On-Page SEO" },
                { text: "Technical SEO Audit" },
                { text: "Basic Link Building" },
                { text: "2 Blogs/Month" },
                { text: "Monthly Report" },
                { text: "3 Month Minimum Contract" }
              ]
            },
            {
              name: "Growth",
              price: "₹17,999/mo",
              popular: true,
              features: [
                { text: "25-30 Keywords" },
                { text: "Complete On-Page SEO" },
                { text: "Technical SEO" },
                { text: "Advanced Link Building" },
                { text: "4 Blogs/Month" },
                { text: "Competitor Analysis" },
                { text: "Keyword Tracking" },
                { text: "Monthly Detailed Report" },
                { text: "6 Month Minimum Contract" }
              ]
            },
            {
              name: "Professional",
              price: "₹29,999/mo",
              features: [
                { text: "50+ Keywords" },
                { text: "Complete On-Page + Technical SEO" },
                { text: "Premium Link Building" },
                { text: "8 Blogs/Month" },
                { text: "Content Strategy" },
                { text: "Competitor Tracking" },
                { text: "Weekly Updates" },
                { text: "Dedicated SEO Manager" },
                { text: "Monthly Detailed Report" },
                { text: "6 Month Minimum Contract" }
              ]
            },
            {
              name: "Enterprise",
              price: "₹49,999+/mo",
              features: [
                { text: "Unlimited Keywords" },
                { text: "Full SEO Management" },
                { text: "Premium Link Building" },
                { text: "15+ Blogs/Month" },
                { text: "Complete Content Strategy" },
                { text: "Advanced Technical SEO" },
                { text: "Dedicated Project Manager" },
                { text: "Weekly Calls" },
                { text: "6 Month Minimum Contract" }
              ]
            }
          ]
        },
        {
          id: "ecommerce-seo",
          title: "Ecommerce SEO",
          subtitle: "Online stores ke liye",
          plans: [
            {
              name: "Starter",
              price: "₹12,999/mo",
              features: [
                { text: "20 Keywords" },
                { text: "Product Page Optimization" },
                { text: "Category Page SEO" },
                { text: "Basic Link Building" },
                { text: "2 Blogs/Month" },
                { text: "Monthly Report" },
                { text: "3 Month Minimum Contract" }
              ]
            },
            {
              name: "Growth",
              price: "₹22,999/mo",
              popular: true,
              features: [
                { text: "50 Keywords" },
                { text: "Complete Product + Category SEO" },
                { text: "Technical SEO" },
                { text: "Advanced Link Building" },
                { text: "4 Blogs/Month" },
                { text: "Competitor Analysis" },
                { text: "Monthly Detailed Report" },
                { text: "6 Month Minimum Contract" }
              ]
            },
            {
              name: "Professional",
              price: "₹39,999/mo",
              features: [
                { text: "100+ Keywords" },
                { text: "Full Ecommerce SEO" },
                { text: "Premium Link Building" },
                { text: "8 Blogs/Month" },
                { text: "Content Strategy" },
                { text: "Advanced Technical SEO" },
                { text: "Dedicated SEO Manager" },
                { text: "Weekly Updates" },
                { text: "6 Month Minimum Contract" }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "ads",
      title: "Advertising (Paid Ads) Pricing",
      categories: [
        {
          id: "meta-ads",
          title: "Meta Ads (Facebook + Instagram)",
          subtitle: "Performance marketing on Meta platforms",
          plans: [
            {
              name: "Starter",
              price: "₹5,999/mo",
              features: [
                { text: "1 Campaign" },
                { text: "2-3 Ad Sets" },
                { text: "Basic Audience Targeting" },
                { text: "2 Ad Creatives" },
                { text: "Campaign Setup + Management" },
                { text: "Basic Pixel Setup" },
                { text: "Monthly Report" },
                { text: "Ad Budget Separate — Min ₹5,000/month" }
              ]
            },
            {
              name: "Growth",
              price: "₹9,999/mo",
              popular: true,
              features: [
                { text: "2-3 Campaigns" },
                { text: "5-6 Ad Sets" },
                { text: "Advanced Audience Targeting" },
                { text: "Lookalike Audience" },
                { text: "4-5 Ad Creatives" },
                { text: "Retargeting Setup" },
                { text: "Pixel + Events Setup" },
                { text: "Bi-Weekly Report" },
                { text: "Ad Budget Separate — Min ₹10,000/month" }
              ]
            },
            {
              name: "Professional",
              price: "₹16,999/mo",
              features: [
                { text: "Unlimited Campaigns" },
                { text: "Advanced Audience Research" },
                { text: "Lookalike + Custom Audience" },
                { text: "8-10 Ad Creatives" },
                { text: "A/B Testing" },
                { text: "Full Funnel Strategy" },
                { text: "Retargeting Campaigns" },
                { text: "Pixel + Conversion Tracking" },
                { text: "Weekly Updates" },
                { text: "Dedicated Ad Manager" },
                { text: "Monthly Detailed Report" },
                { text: "Ad Budget Separate — Min ₹20,000/month" }
              ]
            },
            {
              name: "Enterprise",
              price: "₹29,999+/mo",
              features: [
                { text: "Full Meta Ads Management" },
                { text: "Advanced Funnel Building" },
                { text: "Custom + Lookalike Audiences" },
                { text: "Unlimited Ad Creatives" },
                { text: "Advanced A/B Testing" },
                { text: "Lead Generation Campaigns" },
                { text: "Ecommerce Catalog Ads" },
                { text: "Full Pixel Implementation" },
                { text: "Weekly Calls" },
                { text: "Dedicated Ad Manager" },
                { text: "Ad Budget Separate — Min ₹50,000/month" }
              ]
            }
          ]
        },
        {
          id: "google-ads",
          title: "Google Ads",
          subtitle: "Search, Display, YouTube & Shopping Ads",
          plans: [
            {
              name: "Starter",
              price: "₹5,999/mo",
              features: [
                { text: "1 Campaign" },
                { text: "Search Ads Only" },
                { text: "10-15 Keywords" },
                { text: "Basic Ad Copywriting" },
                { text: "Campaign Setup + Management" },
                { text: "Google Analytics Setup" },
                { text: "Monthly Report" },
                { text: "Ad Budget Separate — Min ₹5,000/month" }
              ]
            },
            {
              name: "Growth",
              price: "₹10,999/mo",
              popular: true,
              features: [
                { text: "2-3 Campaigns" },
                { text: "Search + Display Ads" },
                { text: "25-30 Keywords" },
                { text: "Advanced Keyword Research" },
                { text: "Ad Copywriting" },
                { text: "Negative Keywords Setup" },
                { text: "Conversion Tracking" },
                { text: "Bi-Weekly Report" },
                { text: "Ad Budget Separate — Min ₹15,000/month" }
              ]
            },
            {
              name: "Professional",
              price: "₹18,999/mo",
              features: [
                { text: "Unlimited Campaigns" },
                { text: "Search + Display + YouTube Ads" },
                { text: "Advanced Keyword Research" },
                { text: "Competitor Analysis" },
                { text: "A/B Ad Testing" },
                { text: "Full Conversion Tracking" },
                { text: "Remarketing Setup" },
                { text: "Shopping Ads Setup" },
                { text: "Weekly Updates" },
                { text: "Dedicated Ad Manager" },
                { text: "Monthly Detailed Report" },
                { text: "Ad Budget Separate — Min ₹30,000/month" }
              ]
            },
            {
              name: "Enterprise",
              price: "₹34,999+/mo",
              features: [
                { text: "Full Google Ads Management" },
                { text: "All Campaign Types" },
                { text: "Advanced Competitor Research" },
                { text: "Performance Max Campaigns" },
                { text: "Shopping + YouTube + Display" },
                { text: "Advanced Remarketing" },
                { text: "Full Conversion Tracking" },
                { text: "Weekly Calls" },
                { text: "Dedicated Ad Manager" },
                { text: "Ad Budget Separate — Min ₹75,000/month" }
              ]
            }
          ]
        },
        {
          id: "combo-ads",
          title: "Combined Package (Meta + Google)",
          subtitle: "Best value — both platforms managed together",
          plans: [
            {
              name: "Growth Combo",
              price: "₹17,999/mo",
              popular: true,
              features: [
                { text: "Meta Ads Management" },
                { text: "Google Ads Management" },
                { text: "Combined Strategy" },
                { text: "Unified Reporting" },
                { text: "Ad Budget Separate — Min ₹20,000/month" }
              ]
            },
            {
              name: "Professional Combo",
              price: "₹29,999/mo",
              features: [
                { text: "Full Meta + Google Management" },
                { text: "Advanced Strategy" },
                { text: "A/B Testing Both Platforms" },
                { text: "Unified Dashboard" },
                { text: "Weekly Updates" },
                { text: "Dedicated Manager" },
                { text: "Ad Budget Separate — Min ₹40,000/month" }
              ]
            }
          ]
        }
      ]
    }
  ],
  bannerText: "Work starts with just ₹1,000 advance — remaining payment after delivery",
  ctaText: "Get Started Today",
  ctaHref: "/contact"
};
