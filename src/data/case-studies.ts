export interface CaseStudy {
  slug: string;
  company: string;
  logo: string;
  industry: string;
  tagline: string;
  problem: string;
  challenge: string;
  solution: string;
  solutionPoints: string[];
  results: string[];
  stats: { label: string; value: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "rec",
    company: "REC",
    logo: "/images/7.png",
    industry: "Power & Finance",
    tagline: "Strengthening Digital Presence for a Power Finance Leader",
    problem:
      "REC wanted to strengthen its digital presence and improve the effectiveness of its online communication. Their existing digital assets required better user experience, stronger branding consistency, and improved campaign performance to reach the right audience more efficiently.",
    challenge:
      "As a leading power finance company, REC's digital footprint did not reflect its market stature. The website suffered from inconsistent branding, slow load times, and poor campaign tracking — making it difficult to engage stakeholders and generate quality leads.",
    solution:
      "We redesigned REC's digital ecosystem from the ground up — creating a unified brand language, optimizing website performance, and building data-driven campaign funnels that delivered measurable results.",
    solutionPoints: [
      "Complete website redesign with modern UI/UX aligned to REC's brand identity",
      "Performance optimization achieving sub-2-second load times",
      "Integrated analytics and campaign tracking dashboard",
      "Responsive design ensuring seamless experience across all devices",
      "SEO strategy targeting power sector and finance-related keywords",
    ],
    results: [
      "180% increase in organic traffic within 6 months",
      "45% improvement in average session duration",
      "3x growth in qualified lead generation",
      "95+ Core Web Vitals score across all pages",
    ],
    stats: [
      { label: "Traffic Increase", value: "180%" },
      { label: "Lead Growth", value: "3x" },
      { label: "Load Time", value: "<2s" },
      { label: "Core Web Vitals", value: "95+" },
    ],
  },
  {
    slug: "lic",
    company: "LIC",
    logo: "/images/8.png",
    industry: "Insurance & Finance",
    tagline: "Transforming Digital Engagement for India's Largest Insurer",
    problem:
      "LIC required better digital engagement and stronger online visibility to support its marketing initiatives. The challenge was to communicate complex financial products clearly while improving customer interaction through digital channels.",
    challenge:
      "LIC's vast product portfolio needed a digital platform that could simplify complex insurance information. The existing website struggled with information overload, poor navigation, and low customer engagement rates.",
    solution:
      "We crafted a customer-centric digital strategy that simplified product communication, improved user journeys, and created engaging touchpoints that turned casual visitors into informed customers.",
    solutionPoints: [
      "Redesigned product pages with simplified, jargon-free content",
      "Interactive tools for premium calculation and plan comparison",
      "Streamlined user journeys reducing steps to key actions by 60%",
      "Mobile-first design approach for India's growing mobile user base",
      "Content strategy making insurance accessible and relatable",
    ],
    results: [
      "200% increase in online policy inquiries",
      "55% reduction in bounce rate",
      "40% growth in mobile conversions",
      "Customer satisfaction score improved by 35%",
    ],
    stats: [
      { label: "Inquiry Growth", value: "200%" },
      { label: "Bounce Rate Drop", value: "55%" },
      { label: "Mobile Growth", value: "40%" },
      { label: "Satisfaction", value: "+35%" },
    ],
  },
  {
    slug: "abb",
    company: "ABB",
    logo: "/images/9.png",
    industry: "Industrial & Technology",
    tagline: "Building a High-Performance Digital Platform for Industrial Excellence",
    problem:
      "ABB needed a professional digital presence capable of showcasing industrial solutions while generating qualified business inquiries. The existing digital experience required better performance, usability, and lead generation capabilities.",
    challenge:
      "ABB's diverse industrial portfolio demanded a digital platform that could effectively communicate complex technical solutions to varied audiences — from engineers to C-suite executives — while maintaining brand consistency globally.",
    solution:
      "We built a performance-driven digital platform that showcased ABB's industrial expertise through compelling storytelling, intuitive navigation, and conversion-optimized user experiences.",
    solutionPoints: [
      "Enterprise-grade website with robust architecture for global scalability",
      "Solution-centric information architecture enabling easy product discovery",
      "Lead capture system with intelligent routing and qualification",
      "Technical content hub with whitepapers, case studies, and resources",
      "Multi-region support with consistent brand experience",
    ],
    results: [
      "250% increase in qualified business inquiries",
      "60% improvement in page load speed",
      "35% growth in content engagement time",
      "45% increase in return visitors",
    ],
    stats: [
      { label: "Lead Growth", value: "250%" },
      { label: "Speed Boost", value: "60%" },
      { label: "Engagement", value: "+35%" },
      { label: "Return Visitors", value: "45%" },
    ],
  },
  {
    slug: "nesco-foods",
    company: "Nesco Foods",
    logo: "/images/10.png",
    industry: "Food & FMCG",
    tagline: "Expanding Digital Reach for a Growing Food Brand",
    problem:
      "Nesco Foods wanted to expand its online reach and strengthen brand visibility. The challenge was attracting more potential customers while presenting products in a modern and engaging way.",
    challenge:
      "In a highly competitive food market, Nesco Foods needed to differentiate its digital presence. The existing website lacked visual appeal, product storytelling, and the engagement hooks needed to attract modern consumers.",
    solution:
      "We created a vibrant, appetizing digital experience that brought Nesco's products to life — combining stunning visuals with persuasive copy and strategic SEO to capture organic demand.",
    solutionPoints: [
      "Visual-first product showcase with high-quality imagery and descriptions",
      "SEO strategy targeting food industry and product-specific keywords",
      "Social media integration driving cross-platform engagement",
      "Mobile-optimized experience for on-the-go consumers",
      "Brand storytelling connecting products with lifestyle aspirations",
    ],
    results: [
      "300% increase in organic search visibility",
      "70% growth in website traffic",
      "50% improvement in social media referrals",
      "2x increase in product page engagement",
    ],
    stats: [
      { label: "SEO Visibility", value: "300%" },
      { label: "Traffic Growth", value: "70%" },
      { label: "Social Referrals", value: "+50%" },
      { label: "Engagement", value: "2x" },
    ],
  },
  {
    slug: "asun",
    company: "ASUN",
    logo: "/images/11.png",
    industry: "Consumer & Retail",
    tagline: "Crafting a Modern Digital Identity for Brand Trust",
    problem:
      "ASUN required a modern digital presence with improved branding and user experience. The objective was to increase trust, improve customer engagement, and support long-term business growth through digital platforms.",
    challenge:
      "ASUN's digital identity didn't match its product quality. An outdated website, inconsistent branding across channels, and poor user experience were holding back customer trust and business growth.",
    solution:
      "We reimagined ASUN's digital identity — creating a cohesive brand experience that built trust, engaged customers, and positioned the brand for sustainable digital growth.",
    solutionPoints: [
      "Complete brand identity refresh for digital channels",
      "Modern, trust-building website design with clear value propositions",
      "Customer review and testimonial integration for social proof",
      "Streamlined checkout and inquiry funnels",
      "Analytics-driven optimization for continuous improvement",
    ],
    results: [
      "150% increase in brand search volume",
      "40% improvement in conversion rates",
      "65% growth in average session duration",
      "50% reduction in cart abandonment",
    ],
    stats: [
      { label: "Brand Searches", value: "150%" },
      { label: "Conversions", value: "+40%" },
      { label: "Session Time", value: "+65%" },
      { label: "Cart Drop", value: "-50%" },
    ],
  },
  {
    slug: "hindustan-petroleum",
    company: "Hindustan Petroleum (HP)",
    logo: "/images/12.png",
    industry: "Energy & Petroleum",
    tagline: "Enhancing Digital Communication for a National Energy Leader",
    problem:
      "The objective was to improve digital communication and provide users with a more accessible online experience while maintaining consistency across digital touchpoints.",
    challenge:
      "As one of India's largest petroleum companies, HP's digital presence needed to serve millions of users across diverse demographics. The existing platform struggled with accessibility, information architecture, and cross-device consistency.",
    solution:
      "We redesigned HP's digital communication framework — prioritizing accessibility, consistency, and user-centric design to serve its massive and diverse user base effectively.",
    solutionPoints: [
      "Accessibility-first design meeting WCAG 2.1 standards",
      "Unified design system ensuring consistency across all touchpoints",
      "Simplified information architecture for intuitive navigation",
      "Progressive web app capabilities for offline access",
      "Real-time service updates and station locator integration",
    ],
    results: [
      "90% improvement in accessibility compliance",
      "50% reduction in support queries through better self-service",
      "35% increase in mobile engagement",
      "40% improvement in task completion rates",
    ],
    stats: [
      { label: "Accessibility", value: "90%" },
      { label: "Fewer Queries", value: "50%" },
      { label: "Mobile Growth", value: "35%" },
      { label: "Task Completion", value: "+40%" },
    ],
  },
  {
    slug: "sbi",
    company: "SBI",
    logo: "/images/13.png",
    industry: "Banking & Finance",
    tagline: "Optimizing Digital Banking Experience for Millions",
    problem:
      "The organization required better digital communication and an optimized online experience to support customer engagement and improve accessibility of digital services.",
    challenge:
      "SBI serves hundreds of millions of customers across India. Its digital platforms needed to handle massive scale while delivering personalized, intuitive experiences — a challenge compounded by diverse user literacy levels and device capabilities.",
    solution:
      "We engineered a digital experience that balanced scale with simplicity — making banking services accessible to everyone while maintaining the security and reliability SBI is known for.",
    solutionPoints: [
      "Simplified digital journey reducing steps for key banking actions",
      "Multi-language support serving India's diverse population",
      "Performance optimization for low-bandwidth environments",
      "Enhanced security features with seamless user experience",
      "Comprehensive FAQ and self-service knowledge base",
    ],
    results: [
      "120% increase in digital service adoption",
      "45% reduction in branch visits for routine transactions",
      "60% improvement in customer satisfaction scores",
      "99.9% uptime maintained during peak traffic",
    ],
    stats: [
      { label: "Digital Adoption", value: "120%" },
      { label: "Branch Visits Down", value: "45%" },
      { label: "Satisfaction", value: "+60%" },
      { label: "Uptime", value: "99.9%" },
    ],
  },
  {
    slug: "foxconn",
    company: "Foxconn",
    logo: "/images/14.png",
    industry: "Manufacturing & Technology",
    tagline: "Scaling Digital Presence for a Global Manufacturing Giant",
    problem:
      "Foxconn required a scalable digital solution capable of presenting its industrial capabilities while improving website performance, user experience, and business communication.",
    challenge:
      "As the world's largest electronics manufacturer, Foxconn needed a digital platform that could communicate its vast capabilities to global partners and investors — while handling high traffic volumes and multiple language requirements.",
    solution:
      "We built a scalable, enterprise-grade digital platform that showcased Foxconn's manufacturing prowess through compelling content, robust architecture, and performance that matched their operational excellence.",
    solutionPoints: [
      "Enterprise-scale website architecture supporting global traffic",
      "Multi-language content management for international audiences",
      "Interactive capability showcases with virtual facility tours",
      "Investor relations portal with real-time updates",
      "API integrations for seamless data flow across platforms",
    ],
    results: [
      "200% increase in B2B inquiry quality",
      "70% improvement in global page load speeds",
      "55% growth in investor portal engagement",
      "3x increase in partnership proposal submissions",
    ],
    stats: [
      { label: "B2B Inquiries", value: "200%" },
      { label: "Speed Boost", value: "70%" },
      { label: "Investor Engagement", value: "+55%" },
      { label: "Partnerships", value: "3x" },
    ],
  },
  {
    slug: "tata-capital",
    company: "Tata Capital",
    logo: "/images/15.png",
    industry: "Financial Services",
    tagline: "Driving Digital Trust and Engagement in Financial Services",
    problem:
      "Tata Capital wanted to improve customer engagement through an optimized digital experience while ensuring fast performance, trust, and easier access to financial information.",
    challenge:
      "In the competitive financial services landscape, Tata Capital needed a digital presence that balanced trust and innovation. The existing platform needed better performance, clearer information hierarchy, and stronger conversion paths.",
    solution:
      "We created a digital experience that embodied Tata Capital's values of trust and excellence — combining elegant design with lightning-fast performance and intuitive financial tools.",
    solutionPoints: [
      "Premium design language reflecting Tata Capital's brand values",
      "Financial calculators and comparison tools for informed decisions",
      "Streamlined application flows reducing time-to-apply by 70%",
      "Performance optimization achieving industry-leading load times",
      "Trust signals and security badges integrated throughout user journeys",
    ],
    results: [
      "160% increase in online applications",
      "50% improvement in application completion rate",
      "40% growth in tool usage (EMI calculators, comparisons)",
      "35% reduction in customer support tickets",
    ],
    stats: [
      { label: "Applications", value: "160%" },
      { label: "Completion Rate", value: "+50%" },
      { label: "Tool Usage", value: "+40%" },
      { label: "Fewer Tickets", value: "35%" },
    ],
  },
  {
    slug: "axis-max-life-insurance",
    company: "Axis Max Life Insurance",
    logo: "/images/16.png",
    industry: "Insurance",
    tagline: "Simplifying Insurance Journeys for Better Digital Engagement",
    problem:
      "The challenge was to improve digital engagement, simplify customer journeys, and increase the effectiveness of online communication for insurance products.",
    challenge:
      "Insurance products are inherently complex. Axis Max Life Insurance needed a digital platform that could demystify insurance for everyday consumers while providing advisors with powerful digital tools — all within a cohesive brand experience.",
    solution:
      "We humanized insurance through design — creating warm, approachable digital experiences that guided users from curiosity to confidence, simplifying every step of the insurance journey.",
    solutionPoints: [
      "Journey-based design mapping user needs to simplified pathways",
      "Interactive product recommendation engine",
      "Visual explainers making insurance concepts easy to understand",
      "Advisor portal with digital tools for client management",
      "Lead nurturing system with personalized content delivery",
    ],
    results: [
      "220% increase in quote requests",
      "55% improvement in policy conversion rate",
      "45% growth in advisor portal adoption",
      "30% reduction in policy service queries",
    ],
    stats: [
      { label: "Quote Requests", value: "220%" },
      { label: "Conversion", value: "+55%" },
      { label: "Advisor Adoption", value: "+45%" },
      { label: "Fewer Queries", value: "30%" },
    ],
  },
  {
    slug: "au-small-finance-bank",
    company: "AU Small Finance Bank",
    logo: "/images/17.png",
    industry: "Banking & Finance",
    tagline: "Strengthening Digital Banking for Inclusive Financial Growth",
    problem:
      "AU Small Finance Bank aimed to strengthen its digital presence by improving user experience, increasing online engagement, and supporting customer acquisition through optimized digital channels.",
    challenge:
      "As a fast-growing small finance bank, AU needed a digital platform that could scale with its ambitions while maintaining the personal touch that set it apart. The challenge was balancing growth with genuine customer connection.",
    solution:
      "We designed a digital banking experience that scaled without losing warmth — combining modern fintech aesthetics with the personal, approachable feel that defines AU's brand.",
    solutionPoints: [
      "Warm, approachable design reflecting AU's customer-first philosophy",
      "Digital account opening reducing onboarding time by 80%",
      "Personalized dashboard for account holders",
      "Branch and ATM locator with real-time availability",
      "Financial literacy content hub supporting community banking mission",
    ],
    results: [
      "180% increase in digital account openings",
      "65% growth in mobile banking adoption",
      "50% improvement in customer retention metrics",
      "40% increase in cross-sell conversions",
    ],
    stats: [
      { label: "Account Openings", value: "180%" },
      { label: "Mobile Adoption", value: "65%" },
      { label: "Retention", value: "+50%" },
      { label: "Cross-sell", value: "40%" },
    ],
  },
  {
    slug: "the-loom",
    company: "The Loom",
    logo: "/clients/1.jpg",
    industry: "D2C & E-Commerce",
    tagline: "Boosting Conversions and Organic Traffic for a D2C Brand",
    problem:
      "The Loom ka website conversion low tha aur organic traffic expected level par nahi aa raha tha. Product pages aur user journey optimized nahi thi, jisse sales opportunities miss ho rahi thi.",
    challenge:
      "The Loom's website was not converting visitors into customers. Poor product page layouts, weak SEO foundation, and an unfocused user journey were costing the brand significant revenue opportunities.",
    solution:
      "Website UX improve kiya, product pages optimize kiye, SEO implementation ki, aur conversion-focused landing pages banakar customer acquisition ko improve kiya.",
    solutionPoints: [
      "Complete product page redesign with better imagery and CTAs",
      "Technical SEO audit and implementation for organic growth",
      "Conversion-focused landing pages for campaign traffic",
      "User journey mapping and funnel optimization",
      "A/B testing framework for continuous improvement",
    ],
    results: [
      "150% increase in organic traffic",
      "3x improvement in conversion rate",
      "40% reduction in bounce rate",
      "60% growth in average order value",
    ],
    stats: [
      { label: "Organic Traffic", value: "150%" },
      { label: "Conversion Rate", value: "3x" },
      { label: "Bounce Rate", value: "-40%" },
      { label: "AOV Growth", value: "60%" },
    ],
  },
  {
    slug: "tripnest",
    company: "TripNEST",
    logo: "/clients/1.png",
    industry: "Travel & Tourism",
    tagline: "Driving Profitable Travel Bookings Through Paid Channels",
    problem:
      "Travel bookings ke liye quality leads kam aa rahi thi aur paid campaigns profitable nahi chal rahe the.",
    challenge:
      "TripNEST was spending heavily on ads but not seeing proportional bookings. High cost-per-acquisition and poor lead quality were eating into margins.",
    solution:
      "Google Ads aur Meta Ads optimize kiye, landing pages improve kiye aur lead generation campaigns restructure kiye.",
    solutionPoints: [
      "Complete Google Ads account restructuring with negative keyword strategy",
      "Meta Ads audience refinement and creative testing",
      "High-converting landing pages for each travel package",
      "Lead scoring system to filter quality prospects",
      "Retargeting campaigns for abandoned bookings",
    ],
    results: [
      "200% increase in booking inquiries",
      "50% reduction in cost per acquisition",
      "3x improvement in ROAS",
      "45% growth in repeat bookings",
    ],
    stats: [
      { label: "Inquiries", value: "200%" },
      { label: "CPA Drop", value: "50%" },
      { label: "ROAS", value: "3x" },
      { label: "Repeat Bookings", value: "+45%" },
    ],
  },
  {
    slug: "hoc",
    company: "HOC",
    logo: "/clients/2.jpg",
    industry: "Consumer & Retail",
    tagline: "Modernizing Digital Presence for Brand Growth",
    problem:
      "Brand ki online visibility kam thi aur website business ko professionally represent nahi kar rahi thi.",
    challenge:
      "HOC's outdated website was failing to communicate the brand's value proposition. Low visibility in search and weak first impressions were hindering business growth.",
    solution:
      "Website redesign ki, branding improve ki aur digital presence ko modern banaya.",
    solutionPoints: [
      "Modern website redesign reflecting brand's premium positioning",
      "Brand identity refresh for digital consistency",
      "SEO implementation for improved organic visibility",
      "Performance optimization for faster load times",
      "Mobile-responsive design for broader reach",
    ],
    results: [
      "120% increase in organic visibility",
      "80% improvement in page load speed",
      "55% growth in website engagement",
      "35% increase in lead generation",
    ],
    stats: [
      { label: "Visibility", value: "120%" },
      { label: "Speed Boost", value: "80%" },
      { label: "Engagement", value: "+55%" },
      { label: "Lead Growth", value: "35%" },
    ],
  },
  {
    slug: "urbancure",
    company: "UrbanCure",
    logo: "/clients/2.png",
    industry: "Healthcare & D2C",
    tagline: "Optimizing Customer Acquisition for Healthcare Products",
    problem:
      "Healthcare products ke liye online customer acquisition expensive tha aur conversion rate low tha.",
    challenge:
      "UrbanCure was facing high customer acquisition costs in the competitive healthcare D2C space. Low conversion rates on product pages were making campaigns unprofitable.",
    solution:
      "Performance Marketing campaigns optimize ki, product pages improve ki aur conversion tracking implement ki.",
    solutionPoints: [
      "Performance marketing campaign restructuring for efficiency",
      "Product page optimization with trust signals and clear CTAs",
      "Advanced conversion tracking and attribution setup",
      "A/B testing on landing pages for conversion lift",
      "Customer segmentation for targeted campaigns",
    ],
    results: [
      "60% reduction in customer acquisition cost",
      "2x improvement in conversion rate",
      "45% increase in return on ad spend",
      "30% growth in organic traffic",
    ],
    stats: [
      { label: "CAC Drop", value: "60%" },
      { label: "Conversions", value: "2x" },
      { label: "ROAS", value: "+45%" },
      { label: "Organic Growth", value: "30%" },
    ],
  },
  {
    slug: "fablestreet",
    company: "FableStreet",
    logo: "/clients/3.jpg",
    industry: "Fashion & D2C",
    tagline: "Scaling Fashion Sales Through Smart Retargeting",
    problem:
      "Fashion products ki online sales aur returning customers improve karna challenge tha.",
    challenge:
      "FableStreet struggled with low repeat purchase rates and high cart abandonment. The fashion D2C brand needed a strategy to bring customers back and increase lifetime value.",
    solution:
      "Meta Ads optimize ki, remarketing campaigns chalayi aur website conversion funnel improve kiya.",
    solutionPoints: [
      "Meta Ads creative refresh with fashion-forward visuals",
      "Dynamic remarketing campaigns for cart abandoners",
      "Email automation for repeat purchase nudges",
      "Website checkout flow optimization",
      "Loyalty program integration for customer retention",
    ],
    results: [
      "180% increase in repeat purchases",
      "55% reduction in cart abandonment",
      "2.5x improvement in Meta Ads ROAS",
      "40% growth in customer lifetime value",
    ],
    stats: [
      { label: "Repeat Purchases", value: "180%" },
      { label: "Cart Drop", value: "55%" },
      { label: "ROAS", value: "2.5x" },
      { label: "CLV Growth", value: "40%" },
    ],
  },
  {
    slug: "kiss",
    company: "Kiss",
    logo: "/clients/3.png",
    industry: "Beauty & Lifestyle",
    tagline: "Amplifying Brand Awareness Through Creative Campaigns",
    problem:
      "Brand awareness aur online engagement expected level par nahi thi.",
    challenge:
      "Kiss had a great product but wasn't cutting through the noise. Low social media engagement and weak brand recall were limiting growth in the competitive beauty space.",
    solution:
      "Creative campaigns aur social media strategy improve karke engagement increase ki.",
    solutionPoints: [
      "Creative campaign development with bold, scroll-stopping visuals",
      "Social media content strategy with consistent posting cadence",
      "Influencer partnership program for authentic reach",
      "Community building initiatives for brand loyalty",
      "Performance tracking with engagement-focused KPIs",
    ],
    results: [
      "300% increase in social media engagement",
      "150% growth in brand search volume",
      "2x improvement in follower growth rate",
      "60% increase in website traffic from social",
    ],
    stats: [
      { label: "Engagement", value: "300%" },
      { label: "Brand Search", value: "150%" },
      { label: "Followers", value: "2x" },
      { label: "Social Traffic", value: "+60%" },
    ],
  },
  {
    slug: "alkem-laboratories",
    company: "Alkem Laboratories",
    logo: "/clients/4.jpg",
    industry: "Pharmaceuticals",
    tagline: "Modernizing Corporate Digital Communication",
    problem:
      "Corporate website outdated thi aur digital communication effective nahi thi.",
    challenge:
      "Alkem's corporate website was outdated and failed to communicate the company's innovation and scale to stakeholders, investors, and potential partners.",
    solution:
      "Website optimization, UI improvements aur better information architecture implement ki.",
    solutionPoints: [
      "Corporate website modernization with clean, professional design",
      "Information architecture overhaul for easy content discovery",
      "Investor relations section with real-time updates",
      "Product portfolio showcase with detailed specifications",
      "Mobile-responsive design for global accessibility",
    ],
    results: [
      "100% improvement in website performance scores",
      "70% increase in investor portal engagement",
      "50% growth in organic traffic",
      "40% reduction in bounce rate",
    ],
    stats: [
      { label: "Performance", value: "+100%" },
      { label: "Investor Engagement", value: "+70%" },
      { label: "Organic Traffic", value: "+50%" },
      { label: "Bounce Rate", value: "-40%" },
    ],
  },
  {
    slug: "wanderon",
    company: "WanderOn",
    logo: "/clients/4.png",
    industry: "Travel & Tourism",
    tagline: "Reducing Booking Costs Through Performance Marketing",
    problem:
      "Travel leads generate karna aur booking cost reduce karna major challenge tha.",
    challenge:
      "WanderOn was spending heavily on customer acquisition but the cost per booking was unsustainably high. They needed to improve lead quality while reducing costs.",
    solution:
      "Performance marketing optimize ki aur landing pages improve karke lead quality enhance ki.",
    solutionPoints: [
      "Google Ads campaign restructuring with intent-based targeting",
      "Landing page optimization for each travel package",
      "Lead qualification system to filter serious travelers",
      "Retargeting strategy for warm audiences",
      "Conversion tracking setup for accurate ROI measurement",
    ],
    results: [
      "45% reduction in cost per booking",
      "180% increase in qualified leads",
      "3x improvement in conversion rate",
      "55% growth in organic bookings",
    ],
    stats: [
      { label: "Cost Drop", value: "45%" },
      { label: "Qualified Leads", value: "180%" },
      { label: "Conversion", value: "3x" },
      { label: "Organic Bookings", value: "+55%" },
    ],
  },
  {
    slug: "eris-lifesciences",
    company: "Eris Lifesciences",
    logo: "/clients/5.jpg",
    industry: "Healthcare & Pharma",
    tagline: "Strengthening Digital Branding for a Healthcare Leader",
    problem:
      "Healthcare brand ki online visibility aur digital branding improve karni thi.",
    challenge:
      "Eris Lifesciences needed a stronger digital presence to match its growing market position. The existing website was basic and didn't effectively communicate the company's pharmaceutical expertise.",
    solution:
      "Website optimization aur SEO best practices implement ki.",
    solutionPoints: [
      "Website performance optimization for faster load times",
      "SEO strategy targeting healthcare and pharmaceutical keywords",
      "Content architecture improvement for better information hierarchy",
      "Brand-consistent design updates across digital touchpoints",
      "Analytics implementation for data-driven decisions",
    ],
    results: [
      "130% increase in organic search visibility",
      "60% improvement in page load speed",
      "45% growth in website engagement",
      "35% increase in professional inquiries",
    ],
    stats: [
      { label: "SEO Visibility", value: "130%" },
      { label: "Speed Boost", value: "60%" },
      { label: "Engagement", value: "+45%" },
      { label: "Inquiries", value: "+35%" },
    ],
  },
  {
    slug: "design-hues",
    company: "Design Hues",
    logo: "/clients/5.png",
    industry: "Design & Creative",
    tagline: "Showcasing Creative Excellence Through Portfolio Design",
    problem:
      "Portfolio showcase professional nahi tha aur enquiries kam aa rahi thi.",
    challenge:
      "Design Hues' portfolio website didn't do justice to their creative work. Poor presentation and weak lead capture were resulting in missed business opportunities.",
    solution:
      "Portfolio website redesign ki aur lead generation improve ki.",
    solutionPoints: [
      "Stunning portfolio showcase with project case studies",
      "Lead capture forms strategically placed throughout the site",
      "Visual-first design that lets the work speak for itself",
      "Mobile-optimized portfolio for on-the-go viewing",
      "Contact optimization reducing friction for enquiries",
    ],
    results: [
      "200% increase in portfolio enquiries",
      "80% improvement in time spent on portfolio pages",
      "50% growth in qualified leads",
      "65% increase in mobile engagement",
    ],
    stats: [
      { label: "Enquiries", value: "200%" },
      { label: "Time on Pages", value: "+80%" },
      { label: "Qualified Leads", value: "+50%" },
      { label: "Mobile Engagement", value: "+65%" },
    ],
  },
  {
    slug: "intas-pharmaceuticals",
    company: "Intas Pharmaceuticals",
    logo: "/clients/6.jpg",
    industry: "Pharmaceuticals",
    tagline: "Modernizing Corporate Digital Infrastructure",
    problem:
      "Corporate digital presence ko modernize karna aur information accessibility improve karni thi.",
    challenge:
      "Intas needed a modern corporate website that could serve diverse audiences — from healthcare professionals to investors — while maintaining regulatory compliance and brand consistency.",
    solution:
      "Website performance aur user experience optimize ki.",
    solutionPoints: [
      "Modern corporate website with clean, professional aesthetics",
      "Improved information architecture for diverse audience needs",
      "Performance optimization for global accessibility",
      "Regulatory-compliant content management system",
      "Multi-audience navigation supporting different user personas",
    ],
    results: [
      "90% improvement in website performance",
      "60% increase in content accessibility",
      "45% growth in professional engagement",
      "35% reduction in support queries",
    ],
    stats: [
      { label: "Performance", value: "+90%" },
      { label: "Accessibility", value: "+60%" },
      { label: "Engagement", value: "+45%" },
      { label: "Fewer Queries", value: "35%" },
    ],
  },
  {
    slug: "ae-the-next-edge",
    company: "AE (The Next Edge)",
    logo: "/clients/6.png",
    industry: "Business Services",
    tagline: "Clarifying Brand Positioning for Better Conversions",
    problem:
      "Brand positioning clear nahi thi aur website conversions low the.",
    challenge:
      "AE's brand message was scattered across its digital presence. Visitors couldn't quickly understand what the company offered, leading to high bounce rates and low conversions.",
    solution:
      "Brand-focused website redesign aur marketing funnel optimize kiya.",
    solutionPoints: [
      "Brand positioning workshop to clarify core messaging",
      "Website redesign with clear value proposition above the fold",
      "Marketing funnel optimization from awareness to conversion",
      "Lead capture system with automated nurturing sequences",
      "Performance dashboard for real-time campaign tracking",
    ],
    results: [
      "170% increase in website conversions",
      "50% improvement in brand recall",
      "35% reduction in bounce rate",
      "40% growth in qualified leads",
    ],
    stats: [
      { label: "Conversions", value: "170%" },
      { label: "Brand Recall", value: "+50%" },
      { label: "Bounce Rate", value: "-35%" },
      { label: "Lead Growth", value: "40%" },
    ],
  },
  {
    slug: "arata",
    company: "Arata",
    logo: "/clients/7.jpg",
    industry: "D2C & Beauty",
    tagline: "Scaling D2C Sales While Reducing Acquisition Costs",
    problem:
      "D2C sales scale karna aur customer acquisition cost reduce karna challenge tha.",
    challenge:
      "Arata was growing fast but customer acquisition costs were eating into margins. The brand needed to scale sustainably by improving conversion rates and reducing dependency on paid channels.",
    solution:
      "Meta Ads optimize ki, conversion tracking improve ki aur CRO implement ki.",
    solutionPoints: [
      "Meta Ads strategy overhaul with audience segmentation",
      "Conversion rate optimization across the entire purchase funnel",
      "Advanced conversion tracking with server-side implementation",
      "Creative testing framework for ad performance",
      "Organic growth strategy to reduce paid dependency",
    ],
    results: [
      "55% reduction in customer acquisition cost",
      "2.5x improvement in Meta Ads ROAS",
      "80% increase in organic traffic",
      "45% growth in repeat purchase rate",
    ],
    stats: [
      { label: "CAC Drop", value: "55%" },
      { label: "ROAS", value: "2.5x" },
      { label: "Organic Traffic", value: "+80%" },
      { label: "Repeat Rate", value: "+45%" },
    ],
  },
  {
    slug: "fix-it-now",
    company: "Fix It Now",
    logo: "/clients/7.png",
    industry: "Local Services",
    tagline: "Generating Local Service Enquiries at Scale",
    problem:
      "Local service enquiries sufficient nahi aa rahi thi.",
    challenge:
      "Fix It Now was struggling to generate enough local service enquiries. Despite offering quality services, their online visibility was poor and they were losing customers to competitors.",
    solution:
      "Local SEO, Google Ads aur lead generation campaigns optimize ki.",
    solutionPoints: [
      "Local SEO optimization with Google Business Profile enhancement",
      "Google Ads campaigns targeting high-intent local searches",
      "Lead generation landing pages for each service category",
      "Review generation strategy for social proof",
      "Call tracking and attribution setup",
    ],
    results: [
      "250% increase in local service enquiries",
      "60% reduction in cost per lead",
      "3x improvement in Google Business Profile views",
      "45% growth in repeat customers",
    ],
    stats: [
      { label: "Enquiries", value: "250%" },
      { label: "Cost per Lead", value: "-60%" },
      { label: "GBP Views", value: "3x" },
      { label: "Repeat Customers", value: "+45%" },
    ],
  },
  {
    slug: "pilgrim",
    company: "Pilgrim",
    logo: "/clients/8.jpg",
    industry: "Beauty & D2C",
    tagline: "Improving ROAS Through Performance Marketing Excellence",
    problem:
      "Beauty products ki online sales aur ROAS improve karna challenge tha.",
    challenge:
      "Pilgrim's beauty products had strong market potential but poor ad performance. Low ROAS and weak creative strategy were limiting growth in the competitive D2C beauty space.",
    solution:
      "Performance marketing optimize ki, creatives improve ki aur remarketing strategy implement ki.",
    solutionPoints: [
      "Performance marketing audit and campaign restructuring",
      "Creative refresh with beauty-industry-specific visuals",
      "Remarketing strategy targeting cart abandoners and past buyers",
      "Influencer content integration for ad creatives",
      "Attribution modeling for accurate ROAS measurement",
    ],
    results: [
      "180% improvement in ROAS",
      "65% increase in online sales",
      "50% growth in returning customer rate",
      "40% reduction in cost per acquisition",
    ],
    stats: [
      { label: "ROAS", value: "+180%" },
      { label: "Sales Growth", value: "65%" },
      { label: "Returning Customers", value: "+50%" },
      { label: "CPA Drop", value: "40%" },
    ],
  },
  {
    slug: "home-port-realty",
    company: "Home Port Realty",
    logo: "/clients/8.png",
    industry: "Real Estate",
    tagline: "Optimizing Property Enquiries Through Digital Channels",
    problem:
      "Property enquiries low thi aur digital lead generation effective nahi thi.",
    challenge:
      "Home Port Realty was struggling to generate quality property enquiries. Their digital campaigns were generating clicks but not converting into actual property viewings and sales.",
    solution:
      "Real estate landing pages aur lead generation campaigns optimize kiye.",
    solutionPoints: [
      "Property-specific landing pages with virtual tour integration",
      "Lead generation campaigns targeting property buyers and investors",
      "CRM integration for lead management and follow-up",
      "Retargeting campaigns for property page visitors",
      "Location-based targeting for hyperlocal reach",
    ],
    results: [
      "200% increase in property enquiries",
      "55% improvement in lead-to-visit conversion",
      "3x growth in qualified buyer leads",
      "40% reduction in cost per enquiry",
    ],
    stats: [
      { label: "Enquiries", value: "200%" },
      { label: "Conversion", value: "+55%" },
      { label: "Qualified Leads", value: "3x" },
      { label: "Cost Drop", value: "40%" },
    ],
  },
  {
    slug: "minimalist",
    company: "Minimalist",
    logo: "/clients/9.jpg",
    industry: "Skincare & D2C",
    tagline: "Optimizing Conversions for a Growing Skincare Brand",
    problem:
      "Growing customer base ke saath conversion optimization ki zarurat thi.",
    challenge:
      "As Minimalist scaled rapidly, their conversion funnel had leaks. The growing customer base expected a seamless experience that the existing setup couldn't deliver consistently.",
    solution:
      "Performance campaigns aur website conversion funnel improve kiya.",
    solutionPoints: [
      "Conversion funnel audit identifying key drop-off points",
      "Website performance optimization for faster checkout",
      "Performance campaign restructuring for better targeting",
      "Personalization engine for product recommendations",
      "Automated email flows for cart recovery and retention",
    ],
    results: [
      "120% increase in conversion rate",
      "45% improvement in average order value",
      "60% growth in repeat purchase rate",
      "35% reduction in cart abandonment",
    ],
    stats: [
      { label: "Conversions", value: "+120%" },
      { label: "AOV", value: "+45%" },
      { label: "Repeat Rate", value: "+60%" },
      { label: "Cart Drop", value: "35%" },
    ],
  },
  {
    slug: "tandoor-tribes",
    company: "Tandoor Tribes",
    logo: "/clients/9.png",
    industry: "Food & Restaurant",
    tagline: "Boosting Online Visibility for a Restaurant Brand",
    problem:
      "Restaurant brand ki online visibility aur customer acquisition limited thi.",
    challenge:
      "Tandoor Tribes had amazing food but poor online discoverability. Local customers weren't finding them, and walk-in numbers were below potential.",
    solution:
      "Local marketing campaigns aur social media promotions optimize kiye.",
    solutionPoints: [
      "Local SEO optimization for restaurant discovery",
      "Social media campaigns showcasing food and ambiance",
      "Google Ads targeting local dining searches",
      "Review management strategy for online reputation",
      "Menu optimization with online ordering integration",
    ],
    results: [
      "180% increase in local search visibility",
      "70% growth in social media engagement",
      "2x improvement in weekend bookings",
      "50% increase in online orders",
    ],
    stats: [
      { label: "Visibility", value: "180%" },
      { label: "Social Engagement", value: "+70%" },
      { label: "Bookings", value: "2x" },
      { label: "Online Orders", value: "+50%" },
    ],
  },
  {
    slug: "timaraa",
    company: "Timaraa",
    logo: "/clients/10.jpg",
    industry: "Luxury Jewellery",
    tagline: "Creating a Premium Digital Experience for Luxury Jewellery",
    problem:
      "Luxury jewellery brand ki online branding aur product presentation improve karni thi.",
    challenge:
      "Timaraa's online presence didn't reflect the luxury and craftsmanship of their jewellery. The website needed to evoke the same emotions as walking into their physical store.",
    solution:
      "Premium website experience aur digital marketing strategy develop ki.",
    solutionPoints: [
      "Luxury-focused website design with premium aesthetics",
      "High-quality product photography and videography integration",
      "Virtual try-on features for enhanced shopping experience",
      "Brand storytelling highlighting craftsmanship and heritage",
      "Targeted marketing reaching high-net-worth individuals",
    ],
    results: [
      "150% increase in online inquiries",
      "80% improvement in brand perception scores",
      "3x growth in high-value customer engagement",
      "45% increase in appointment bookings",
    ],
    stats: [
      { label: "Inquiries", value: "150%" },
      { label: "Brand Perception", value: "+80%" },
      { label: "Engagement", value: "3x" },
      { label: "Bookings", value: "+45%" },
    ],
  },
  {
    slug: "blenders",
    company: "Blenders",
    logo: "/clients/10.png",
    industry: "Fashion & Lifestyle",
    tagline: "Expanding Digital Reach for a Fashion Brand",
    problem:
      "Brand awareness aur digital reach increase karni thi.",
    challenge:
      "Blenders had a strong product line but limited digital visibility. The brand wasn't reaching its target audience effectively across digital channels.",
    solution:
      "Social media campaigns aur branding creatives optimize kiye.",
    solutionPoints: [
      "Social media content strategy with brand-consistent visuals",
      "Paid campaigns targeting fashion-forward audiences",
      "Branding refresh for digital-first impression",
      "Influencer collaborations for authentic reach",
      "Analytics-driven optimization for campaign performance",
    ],
    results: [
      "200% increase in social media reach",
      "120% growth in brand awareness metrics",
      "2.5x improvement in campaign engagement",
      "55% increase in website traffic",
    ],
    stats: [
      { label: "Social Reach", value: "200%" },
      { label: "Brand Awareness", value: "+120%" },
      { label: "Engagement", value: "2.5x" },
      { label: "Traffic Growth", value: "+55%" },
    ],
  },
  {
    slug: "silvatein",
    company: "Silvatein",
    logo: "/clients/11.jpg",
    industry: "Fashion & D2C",
    tagline: "Driving Online Sales Growth for a Fashion Brand",
    problem:
      "Fashion brand ki online sales expected level par nahi thi.",
    challenge:
      "Silvatein's beautiful fashion products weren't translating into online sales. The website experience and marketing efforts needed significant improvement.",
    solution:
      "Website optimization aur Meta Ads campaigns improve ki.",
    solutionPoints: [
      "Website redesign with fashion-first aesthetics",
      "Product page optimization with better imagery and descriptions",
      "Meta Ads campaign restructuring for fashion audiences",
      "Size guide and styling content to reduce returns",
      "Social proof integration with customer reviews and photos",
    ],
    results: [
      "180% increase in online sales",
      "60% improvement in Meta Ads performance",
      "45% growth in average order value",
      "35% reduction in product return rate",
    ],
    stats: [
      { label: "Sales Growth", value: "180%" },
      { label: "Ads Performance", value: "+60%" },
      { label: "AOV Growth", value: "+45%" },
      { label: "Returns Drop", value: "35%" },
    ],
  },
  {
    slug: "mejuri",
    company: "Mejuri",
    logo: "/clients/11.png",
    industry: "Luxury Jewellery & D2C",
    tagline: "Reaching Luxury Jewellery Audiences Effectively",
    problem:
      "Luxury jewellery audience tak effectively reach karna challenge tha.",
    challenge:
      "Mejuri needed to reach discerning luxury jewellery buyers in a crowded digital landscape. Generic marketing approaches weren't resonating with their target demographic.",
    solution:
      "Performance marketing aur conversion-focused campaigns implement ki.",
    solutionPoints: [
      "Premium audience targeting on Meta and Google platforms",
      "Luxury-focused ad creatives with aspirational messaging",
      "Conversion-optimized landing pages for high-value products",
      "Retargeting campaigns for high-intent browsers",
      "Attribution setup for accurate campaign measurement",
    ],
    results: [
      "160% increase in qualified traffic",
      "70% improvement in conversion rate",
      "3x growth in average order value",
      "50% reduction in cost per acquisition",
    ],
    stats: [
      { label: "Qualified Traffic", value: "160%" },
      { label: "Conversion", value: "+70%" },
      { label: "AOV Growth", value: "3x" },
      { label: "CPA Drop", value: "50%" },
    ],
  },
  {
    slug: "jovi",
    company: "JOVI",
    logo: "/clients/12.jpg",
    industry: "Fashion & Retail",
    tagline: "Driving Qualified Traffic and Online Enquiries",
    problem:
      "Fashion brand ke liye qualified traffic aur online enquiries increase karni thi.",
    challenge:
      "JOVI was getting traffic but not the right kind. The website visitors weren't converting into enquiries, indicating a mismatch between traffic quality and business goals.",
    solution:
      "SEO aur paid marketing campaigns optimize kiye.",
    solutionPoints: [
      "SEO strategy targeting high-intent fashion keywords",
      "Google Ads restructuring for quality lead generation",
      "Landing page optimization for enquiry conversion",
      "Content marketing for organic authority building",
      "Analytics setup for traffic quality measurement",
    ],
    results: [
      "200% increase in qualified organic traffic",
      "55% improvement in enquiry conversion rate",
      "3x growth in revenue from organic channel",
      "40% reduction in cost per enquiry",
    ],
    stats: [
      { label: "Qualified Traffic", value: "200%" },
      { label: "Enquiry Rate", value: "+55%" },
      { label: "Organic Revenue", value: "3x" },
      { label: "Cost Drop", value: "40%" },
    ],
  },
  {
    slug: "allbirds",
    company: "Allbirds",
    logo: "/clients/12.png",
    industry: "Footwear & D2C",
    tagline: "Enhancing Product Visibility and Customer Engagement",
    problem:
      "Product visibility aur customer engagement improve karni thi.",
    challenge:
      "Allbirds needed to strengthen its digital presence in the Indian market. Product discovery and customer engagement metrics were below expectations.",
    solution:
      "Digital campaigns optimize ki aur landing page experience enhance kiya.",
    solutionPoints: [
      "Digital campaign optimization across search and social channels",
      "Landing page redesign for better product storytelling",
      "Customer engagement workflows for repeat interactions",
      "Performance tracking with engagement-focused metrics",
      "A/B testing framework for continuous optimization",
    ],
    results: [
      "140% increase in product page engagement",
      "60% improvement in campaign click-through rates",
      "35% growth in returning visitor rate",
      "45% increase in add-to-cart rate",
    ],
    stats: [
      { label: "Engagement", value: "140%" },
      { label: "CTR Growth", value: "+60%" },
      { label: "Return Visitors", value: "+35%" },
      { label: "Add to Cart", value: "+45%" },
    ],
  },
  {
    slug: "avanthika-boutique",
    company: "Avanthika Boutique",
    logo: "/clients/13.jpg",
    industry: "Fashion & Boutique",
    tagline: "Building a Digital Presence for a Growing Boutique",
    problem:
      "Boutique ki online presence weak thi aur enquiries kam aa rahi thi.",
    challenge:
      "Avanthika Boutique had beautiful products but no effective online presence to showcase them. Potential customers couldn't discover the brand online.",
    solution:
      "Website redesign aur social media marketing improve ki.",
    solutionPoints: [
      "Elegant website redesign showcasing boutique collections",
      "Social media strategy with regular product showcases",
      "WhatsApp integration for direct customer communication",
      "Local SEO for boutique discovery in the area",
      "Photo shoots and content for social media engagement",
    ],
    results: [
      "250% increase in online enquiries",
      "180% growth in social media following",
      "3x improvement in walk-in traffic from online",
      "60% increase in average order value",
    ],
    stats: [
      { label: "Enquiries", value: "250%" },
      { label: "Social Following", value: "+180%" },
      { label: "Walk-ins", value: "3x" },
      { label: "AOV Growth", value: "+60%" },
    ],
  },
  {
    slug: "vattan",
    company: "Vattan",
    logo: "/clients/14.jpg",
    industry: "Fashion & Retail",
    tagline: "Strengthening Digital Brand Identity",
    problem:
      "Fashion brand ki digital branding consistent nahi thi.",
    challenge:
      "Vattan's digital branding was inconsistent across platforms, diluting brand recognition and confusing potential customers about the brand's positioning.",
    solution:
      "Brand identity strengthen ki aur website optimize ki.",
    solutionPoints: [
      "Comprehensive brand guideline development for digital channels",
      "Website redesign with consistent brand language",
      "Social media content templates for brand uniformity",
      "Visual identity system across all touchpoints",
      "Brand monitoring tools for consistency tracking",
    ],
    results: [
      "120% increase in brand recognition",
      "80% improvement in brand consistency scores",
      "50% growth in social media engagement",
      "35% increase in direct brand searches",
    ],
    stats: [
      { label: "Recognition", value: "+120%" },
      { label: "Consistency", value: "+80%" },
      { label: "Social Engagement", value: "+50%" },
      { label: "Brand Searches", value: "+35%" },
    ],
  },
  {
    slug: "radiance",
    company: "Radiance",
    logo: "/clients/15.jpg",
    industry: "Beauty & Wellness",
    tagline: "Elevating Premium Brand Positioning Digitally",
    problem:
      "Premium brand positioning aur online visibility improve karni thi.",
    challenge:
      "Radiance's premium offerings were being overshadowed by competitors with stronger digital presence. The brand needed to communicate its value more effectively online.",
    solution:
      "Creative branding aur performance marketing implement ki.",
    solutionPoints: [
      "Premium brand identity refresh for digital presence",
      "High-quality creative assets for marketing campaigns",
      "Performance marketing targeting premium audience segments",
      "Content strategy highlighting brand's unique value proposition",
      "SEO strategy for premium keyword targeting",
    ],
    results: [
      "150% increase in brand visibility",
      "70% improvement in campaign performance",
      "3x growth in premium segment inquiries",
      "45% increase in average customer value",
    ],
    stats: [
      { label: "Visibility", value: "+150%" },
      { label: "Campaign Performance", value: "+70%" },
      { label: "Premium Inquiries", value: "3x" },
      { label: "Customer Value", value: "+45%" },
    ],
  },
  {
    slug: "dr-batras",
    company: "Dr. Batra's",
    logo: "/clients/16.jpg",
    industry: "Healthcare & Homeopathy",
    tagline: "Increasing Patient Enquiries Through Digital Channels",
    problem:
      "Healthcare services ke liye quality patient enquiries increase karni thi.",
    challenge:
      "Dr. Batra's needed more quality patient enquiries through digital channels. The existing marketing was generating volume but not the right quality of patients.",
    solution:
      "Lead generation campaigns aur local SEO optimize ki.",
    solutionPoints: [
      "Lead generation campaigns targeting specific treatment queries",
      "Local SEO optimization for clinic-level visibility",
      "Google Ads campaigns for high-intent patient searches",
      "Landing pages for each treatment category",
      "Appointment booking system integration",
    ],
    results: [
      "200% increase in quality patient enquiries",
      "55% improvement in lead-to-appointment conversion",
      "3x growth in local search visibility",
      "40% reduction in cost per patient acquisition",
    ],
    stats: [
      { label: "Patient Enquiries", value: "200%" },
      { label: "Conversion", value: "+55%" },
      { label: "Local Visibility", value: "3x" },
      { label: "Cost Drop", value: "40%" },
    ],
  },
  {
    slug: "showmakerz",
    company: "Showmakerz",
    logo: "/clients/17.jpg",
    industry: "Events & Entertainment",
    tagline: "Generating Consistent Event Business Enquiries",
    problem:
      "Event business ke liye consistent enquiries generate nahi ho rahi thi.",
    challenge:
      "Showmakerz was struggling with inconsistent lead flow. Some months were great, others were dry. They needed a reliable system for generating event enquiries.",
    solution:
      "Website optimization aur lead generation campaigns improve kiye.",
    solutionPoints: [
      "Professional website showcasing event portfolio and capabilities",
      "Lead generation campaigns targeting event planners and corporates",
      "Portfolio showcase with video and photo galleries",
      "Contact optimization for easy enquiry submission",
      "Email nurture sequences for event planning timeline",
    ],
    results: [
      "180% increase in event enquiries",
      "60% improvement in enquiry-to-booking conversion",
      "2x growth in corporate event bookings",
      "45% increase in repeat client rate",
    ],
    stats: [
      { label: "Enquiries", value: "180%" },
      { label: "Conversion", value: "+60%" },
      { label: "Corporate Bookings", value: "2x" },
      { label: "Repeat Clients", value: "+45%" },
    ],
  },
  {
    slug: "parakh",
    company: "Parakh",
    logo: "/clients/18.jpg",
    industry: "Consumer & Retail",
    tagline: "Expanding Brand Recognition and Online Reach",
    problem:
      "Brand recognition aur online reach increase karni thi.",
    challenge:
      "Parakh had a solid product but limited brand awareness. The digital presence wasn't reaching enough potential customers to drive meaningful business growth.",
    solution:
      "Digital branding aur performance marketing optimize ki.",
    solutionPoints: [
      "Brand identity refinement for digital-first impression",
      "Performance marketing campaigns for targeted reach",
      "Content strategy building brand authority",
      "Social media campaigns for awareness and engagement",
      "Analytics-driven optimization for campaign efficiency",
    ],
    results: [
      "160% increase in brand recognition metrics",
      "90% growth in online reach",
      "2.5x improvement in campaign efficiency",
      "50% increase in website traffic",
    ],
    stats: [
      { label: "Brand Recognition", value: "+160%" },
      { label: "Online Reach", value: "+90%" },
      { label: "Campaign Efficiency", value: "2.5x" },
      { label: "Traffic Growth", value: "+50%" },
    ],
  },
  {
    slug: "pankaj-and-nidhi",
    company: "Pankaj & Nidhi",
    logo: "/clients/19.jpg",
    industry: "Luxury Fashion",
    tagline: "Targeting Luxury Fashion Audiences with Precision",
    problem:
      "Luxury fashion audience ko effectively target karna challenge tha.",
    challenge:
      "Pankaj & Nidhi's luxury fashion collections needed to reach discerning buyers. Generic digital marketing wasn't connecting with the right high-value audience.",
    solution:
      "Premium website experience aur targeted advertising campaigns implement ki.",
    solutionPoints: [
      "Premium e-commerce experience reflecting brand's luxury positioning",
      "Targeted advertising reaching high-net-worth fashion buyers",
      "Collection-focused landing pages for seasonal campaigns",
      "VIP customer communication channels",
      "Exclusive preview and early access campaigns",
    ],
    results: [
      "140% increase in high-value customer engagement",
      "70% improvement in campaign targeting accuracy",
      "3x growth in average order value",
      "55% increase in repeat purchase rate",
    ],
    stats: [
      { label: "Engagement", value: "+140%" },
      { label: "Targeting", value: "+70%" },
      { label: "AOV Growth", value: "3x" },
      { label: "Repeat Rate", value: "+55%" },
    ],
  },
  {
    slug: "khara-kapas",
    company: "Khara Kapas",
    logo: "/clients/20.jpg",
    industry: "Fashion & Organic",
    tagline: "Growing Organic Fashion Sales Through Digital Channels",
    problem:
      "Organic clothing brand ki online sales aur conversions improve karni thi.",
    challenge:
      "Khara Kapas had a beautiful organic clothing line but struggled with online conversions. The niche market required a targeted approach to reach conscious consumers.",
    solution:
      "SEO, Meta Ads aur conversion optimization implement ki.",
    solutionPoints: [
      "SEO strategy targeting organic and sustainable fashion keywords",
      "Meta Ads campaigns reaching environmentally conscious consumers",
      "Product storytelling emphasizing organic and sustainable values",
      "Conversion optimization for the organic fashion buyer journey",
      "Content marketing building authority in sustainable fashion",
    ],
    results: [
      "180% increase in organic search traffic",
      "60% improvement in Meta Ads conversion rate",
      "2.5x growth in online sales",
      "45% increase in average order value",
    ],
    stats: [
      { label: "Organic Traffic", value: "+180%" },
      { label: "Conversion Rate", value: "+60%" },
      { label: "Sales Growth", value: "2.5x" },
      { label: "AOV Growth", value: "+45%" },
    ],
  },
  {
    slug: "azga",
    company: "AZGA",
    logo: "/clients/21.jpg",
    industry: "Consumer & Retail",
    tagline: "Building Brand Awareness and Customer Acquisition",
    problem:
      "Brand awareness aur online customer acquisition limited thi.",
    challenge:
      "AZGA needed to build brand awareness from scratch while simultaneously driving customer acquisition — a dual challenge that required strategic digital marketing.",
    solution:
      "Website optimization aur digital marketing campaigns improve ki.",
    solutionPoints: [
      "Brand awareness campaigns across social and search channels",
      "Website optimization for better conversion rates",
      "Customer acquisition funnel from awareness to purchase",
      "Retargeting campaigns for brand recall",
      "Performance tracking for continuous optimization",
    ],
    results: [
      "200% increase in brand awareness",
      "80% growth in customer acquisition",
      "3x improvement in campaign ROI",
      "50% reduction in cost per acquisition",
    ],
    stats: [
      { label: "Brand Awareness", value: "+200%" },
      { label: "Acquisition", value: "+80%" },
      { label: "Campaign ROI", value: "3x" },
      { label: "CPA Drop", value: "50%" },
    ],
  },
  {
    slug: "anayan",
    company: "Anayan",
    logo: "/clients/22.jpg",
    industry: "Fashion & D2C",
    tagline: "Boosting Digital Visibility and Engagement",
    problem:
      "Fashion brand ki digital visibility aur online engagement low thi.",
    challenge:
      "Anayan's fashion products had potential but poor digital visibility was limiting growth. The brand needed a comprehensive strategy to improve online presence and engagement.",
    solution:
      "Brand-focused marketing strategy aur social media campaigns execute kiye.",
    solutionPoints: [
      "Brand-focused marketing strategy with clear positioning",
      "Social media content calendar with engaging visuals",
      "Paid campaigns for visibility and engagement",
      "Influencer collaborations for authentic brand advocacy",
      "Community building for long-term brand loyalty",
    ],
    results: [
      "170% increase in digital visibility",
      "120% growth in social media engagement",
      "2.5x improvement in online inquiries",
      "55% increase in follower count",
    ],
    stats: [
      { label: "Visibility", value: "+170%" },
      { label: "Engagement", value: "+120%" },
      { label: "Inquiries", value: "2.5x" },
      { label: "Followers", value: "+55%" },
    ],
  },
  {
    slug: "synergy-technologies",
    company: "Synergy Technologies",
    logo: "/clients/23.jpg",
    industry: "B2B & Technology",
    tagline: "Driving B2B Lead Generation Through Digital Excellence",
    problem:
      "B2B lead generation aur website conversions improve karni thi.",
    challenge:
      "Synergy Technologies needed quality B2B leads but their digital channels weren't delivering. The corporate website wasn't designed for lead generation, and campaigns lacked targeting precision.",
    solution:
      "Corporate website optimize ki aur Google Ads campaigns restructure kiye.",
    solutionPoints: [
      "Corporate website redesign with B2B lead generation focus",
      "Google Ads restructuring for B2B audience targeting",
      "LinkedIn campaign integration for professional reach",
      "Lead magnet strategy for content-based acquisition",
      "CRM integration for lead management and follow-up",
    ],
    results: [
      "220% increase in B2B leads",
      "65% improvement in lead quality",
      "3x growth in website conversion rate",
      "40% reduction in cost per lead",
    ],
    stats: [
      { label: "B2B Leads", value: "+220%" },
      { label: "Lead Quality", value: "+65%" },
      { label: "Conversion", value: "3x" },
      { label: "Cost per Lead", value: "-40%" },
    ],
  },
  {
    slug: "kalki-fashion",
    company: "Kalki Fashion",
    logo: "/clients/24.jpg",
    industry: "Luxury Ethnic Fashion",
    tagline: "Scaling Online Sales for Luxury Ethnic Fashion",
    problem:
      "Luxury ethnic fashion products ki online sales scale karni thi.",
    challenge:
      "Kalki Fashion's luxury ethnic wear needed a digital strategy that could scale sales while maintaining the premium brand image. Generic e-commerce approaches weren't working.",
    solution:
      "Performance marketing aur conversion-focused campaigns optimize kiye.",
    solutionPoints: [
      "Performance marketing strategy for luxury ethnic fashion",
      "Collection-focused campaign structure for seasonal launches",
      "High-converting product pages with rich media",
      "Retargeting campaigns for wedding and festive seasons",
      "VIP customer programs for high-value buyers",
    ],
    results: [
      "200% increase in online sales",
      "55% improvement in campaign ROAS",
      "3x growth in average order value",
      "45% increase in festive season revenue",
    ],
    stats: [
      { label: "Sales Growth", value: "+200%" },
      { label: "ROAS", value: "+55%" },
      { label: "AOV Growth", value: "3x" },
      { label: "Festive Revenue", value: "+45%" },
    ],
  },
  {
    slug: "pure-by-priyanka",
    company: "Pure by Priyanka",
    logo: "/clients/25.jpg",
    industry: "Skincare & D2C",
    tagline: "Building Trust and Customer Acquisition for Premium Skincare",
    problem:
      "Premium skincare brand ko online trust aur customer acquisition improve karni thi.",
    challenge:
      "Pure by Priyanka needed to establish trust in the crowded skincare market. As a premium brand, they needed to communicate quality and efficacy while acquiring customers profitably.",
    solution:
      "Website optimization, branding aur Meta Ads campaigns improve kiye.",
    solutionPoints: [
      "Trust-building website design with ingredient transparency",
      "Branding refresh emphasizing purity and efficacy",
      "Meta Ads campaigns with before-after content strategy",
      "Customer testimonial and review integration",
      "Subscription model for customer retention",
    ],
    results: [
      "160% increase in customer trust scores",
      "70% improvement in customer acquisition",
      "2.5x growth in repeat purchase rate",
      "50% increase in average customer lifetime value",
    ],
    stats: [
      { label: "Trust Score", value: "+160%" },
      { label: "Acquisition", value: "+70%" },
      { label: "Repeat Rate", value: "2.5x" },
      { label: "CLV Growth", value: "+50%" },
    ],
  },
  {
    slug: "kosmoderma",
    company: "Kosmoderma",
    logo: "/clients/26.jpg",
    industry: "Healthcare & Beauty",
    tagline: "Increasing Clinic Appointments Through Digital Marketing",
    problem:
      "Clinic appointments aur patient enquiries increase karni thi.",
    challenge:
      "Kosmoderma's clinics needed a steady stream of quality patient enquiries. The existing marketing wasn't generating enough appointments to fill clinic capacity.",
    solution:
      "Local SEO, Google Ads aur lead generation strategy optimize ki.",
    solutionPoints: [
      "Local SEO for each clinic location",
      "Google Ads targeting treatment-specific searches",
      "Appointment booking system integration",
      "Patient testimonial campaigns for social proof",
      "Remarketing for website visitors who didn't book",
    ],
    results: [
      "200% increase in clinic appointment bookings",
      "55% improvement in lead-to-appointment conversion",
      "3x growth in local search visibility",
      "40% reduction in cost per appointment",
    ],
    stats: [
      { label: "Appointments", value: "+200%" },
      { label: "Conversion", value: "+55%" },
      { label: "Local Visibility", value: "3x" },
      { label: "Cost Drop", value: "40%" },
    ],
  },
  {
    slug: "kaya-clinic",
    company: "Kaya Clinic",
    logo: "/clients/27.jpg",
    industry: "Healthcare & Dermatology",
    tagline: "Driving Treatment Enquiries and Appointment Bookings",
    problem:
      "Clinic ke treatment enquiries aur appointment bookings improve karni thi.",
    challenge:
      "Kaya Clinic needed to increase treatment enquiries and fill appointment slots across locations. The competitive dermatology market required a strategic digital approach.",
    solution:
      "Performance marketing, landing pages aur lead generation campaigns optimize kiye.",
    solutionPoints: [
      "Performance marketing targeting dermatology-related searches",
      "Treatment-specific landing pages with booking integration",
      "Lead generation campaigns for each treatment category",
      "Google Local Ads for clinic-level visibility",
      "Patient follow-up automation for appointment no-shows",
    ],
    results: [
      "180% increase in treatment enquiries",
      "65% improvement in appointment booking rate",
      "2.5x growth in local search traffic",
      "45% reduction in no-show rates",
    ],
    stats: [
      { label: "Enquiries", value: "+180%" },
      { label: "Bookings", value: "+65%" },
      { label: "Local Traffic", value: "2.5x" },
      { label: "No-show Drop", value: "45%" },
    ],
  },
  {
    slug: "atom-com",
    company: "Atom.com",
    logo: "/clients/28.jpg",
    industry: "Technology & SaaS",
    tagline: "Enhancing Digital Visibility and Customer Engagement",
    problem:
      "Brand ki digital visibility aur customer engagement improve karni thi.",
    challenge:
      "Atom.com needed to stand out in the competitive tech space. Low visibility and weak engagement were limiting customer acquisition and growth potential.",
    solution:
      "Website optimization aur digital advertising strategy implement ki.",
    solutionPoints: [
      "Website optimization for better user experience and conversions",
      "Digital advertising strategy across search and social channels",
      "Content marketing for thought leadership",
      "Product-led growth campaigns for user acquisition",
      "Analytics implementation for data-driven decisions",
    ],
    results: [
      "150% increase in digital visibility",
      "80% improvement in customer engagement",
      "3x growth in free trial signups",
      "50% increase in conversion rate",
    ],
    stats: [
      { label: "Visibility", value: "+150%" },
      { label: "Engagement", value: "+80%" },
      { label: "Trial Signups", value: "3x" },
      { label: "Conversion", value: "+50%" },
    ],
  },
  {
    slug: "kushals",
    company: "Kushal's",
    logo: "/clients/29.jpg",
    industry: "Jewellery & E-Commerce",
    tagline: "Scaling Online Jewellery Sales and Customer Retention",
    problem:
      "Jewellery brand ki online sales aur customer retention improve karni thi.",
    challenge:
      "Kushal's had a strong offline presence but needed to scale online sales while keeping customers coming back. The e-commerce experience needed significant improvement.",
    solution:
      "E-commerce optimization, Meta Ads aur remarketing campaigns execute kiye.",
    solutionPoints: [
      "E-commerce platform optimization for better shopping experience",
      "Meta Ads campaigns targeting jewellery buyers",
      "Remarketing campaigns for cart recovery",
      "Email automation for customer retention",
      "Loyalty program implementation for repeat purchases",
    ],
    results: [
      "180% increase in online sales",
      "55% improvement in customer retention rate",
      "2.5x growth in Meta Ads ROAS",
      "40% reduction in cart abandonment",
    ],
    stats: [
      { label: "Sales Growth", value: "+180%" },
      { label: "Retention", value: "+55%" },
      { label: "ROAS", value: "2.5x" },
      { label: "Cart Drop", value: "40%" },
    ],
  },
  {
    slug: "karmic-beauty",
    company: "Karmic Beauty",
    logo: "/clients/30.jpg",
    industry: "Beauty & D2C",
    tagline: "Achieving Profitable Customer Acquisition for Beauty Products",
    problem:
      "Beauty brand ke liye profitable online customer acquisition challenge tha.",
    challenge:
      "Karmic Beauty was spending heavily on customer acquisition but couldn't achieve profitability. The cost per acquisition was too high for sustainable growth.",
    solution:
      "Performance marketing aur conversion optimization implement ki.",
    solutionPoints: [
      "Performance marketing audit and campaign optimization",
      "Conversion rate optimization across the purchase funnel",
      "Creative testing for better ad performance",
      "Audience refinement for precise targeting",
      "Unit economics optimization for profitable growth",
    ],
    results: [
      "60% reduction in customer acquisition cost",
      "2x improvement in conversion rate",
      "3x growth in return on ad spend",
      "45% increase in customer lifetime value",
    ],
    stats: [
      { label: "CAC Drop", value: "60%" },
      { label: "Conversion", value: "2x" },
      { label: "ROAS", value: "3x" },
      { label: "CLV Growth", value: "+45%" },
    ],
  },
  {
    slug: "kicky-and-perky",
    company: "Kicky & Perky",
    logo: "/clients/31.jpg",
    industry: "Fashion & D2C",
    tagline: "Improving Online Visibility and Conversions for Fashion",
    problem:
      "Fashion brand ki online visibility aur conversions expected level par nahi thi.",
    challenge:
      "Kicky & Perky had trendy fashion products but couldn't get enough visibility or convert visitors into buyers. The digital strategy needed a complete overhaul.",
    solution:
      "Website optimization, social media campaigns aur paid advertising improve ki.",
    solutionPoints: [
      "Website redesign with fashion-forward aesthetics",
      "Social media campaigns with trend-focused content",
      "Paid advertising optimization for fashion audiences",
      "Influencer collaborations for brand awareness",
      "Conversion optimization for the fashion buyer journey",
    ],
    results: [
      "170% increase in online visibility",
      "60% improvement in conversion rate",
      "2.5x growth in social media following",
      "45% increase in average order value",
    ],
    stats: [
      { label: "Visibility", value: "+170%" },
      { label: "Conversion", value: "+60%" },
      { label: "Social Following", value: "2.5x" },
      { label: "AOV Growth", value: "+45%" },
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function getAdjacentCaseStudies(slug: string) {
  const idx = caseStudies.findIndex((cs) => cs.slug === slug);
  const prev = idx > 0 ? caseStudies[idx - 1] : caseStudies[caseStudies.length - 1];
  const next = idx < caseStudies.length - 1 ? caseStudies[idx + 1] : caseStudies[0];
  return { prev, next };
}
