"use client";

import { useState, useEffect } from "react";
import { 
  Search, Globe, FileText, CheckCircle2, Save, 
  Code, Braces, Sparkles, AlertCircle, ExternalLink, RefreshCw,
  Sliders, Link2, Share2, ShieldCheck, Zap, Languages, Plus, Trash2, HelpCircle
} from "lucide-react";
import { getSEOContentList, updateSEOFields, SEOContentItem, getSiteSettings, updateSiteSettings, getRedirects, createRedirect, deleteRedirect } from "@/app/actions/seo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SEOClient() {
  const [items, setItems] = useState<SEOContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<"ALL" | "BLOG" | "PAGE">("ALL");
  const [activeTab, setActiveTab] = useState<"onpage" | "technical" | "redirects" | "integrations" | "i18n" | "performance">("onpage");

  // On-Page Editor State
  const [selectedItem, setSelectedItem] = useState<SEOContentItem | null>(null);
  const [slug, setSlug] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  const [schemaMarkup, setSchemaMarkup] = useState("");
  const [headerScript, setHeaderScript] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [imageAlt, setImageAlt] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [onPageMsg, setOnPageMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Technical State
  const [robotsTxt, setRobotsTxt] = useState("");
  const [technicalMsg, setTechnicalMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [technicalLoading, setTechnicalLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<"article" | "faq" | "org" | "none">("none");

  // Redirects State
  const [redirects, setRedirects] = useState<any[]>([]);
  const [fromPath, setFromPath] = useState("");
  const [toPath, setToPath] = useState("");
  const [statusCode, setStatusCode] = useState(301);
  const [redirectMsg, setRedirectMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [redirectLoading, setRedirectLoading] = useState(false);

  // Integrations State
  const [gaTrackingId, setGaTrackingId] = useState("");
  const [gtmContainerId, setGtmContainerId] = useState("");
  const [gscVerification, setGscVerification] = useState("");
  const [globalHeadCode, setGlobalHeadCode] = useState("");
  const [defaultLang, setDefaultLang] = useState("en");
  const [integrationsMsg, setIntegrationsMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [integrationsLoading, setIntegrationsLoading] = useState(false);

  // Load all data on mount
  async function loadData() {
    setLoading(true);
    try {
      const [seoList, settings, redirectList] = await Promise.all([
        getSEOContentList(),
        getSiteSettings(),
        getRedirects(),
      ]);

      setItems(seoList);

      if (settings) {
        setRobotsTxt(settings.robotsTxt || "");
        setGaTrackingId(settings.gaTrackingId || "");
        setGtmContainerId(settings.gtmContainerId || "");
        setGscVerification(settings.gscVerification || "");
        setGlobalHeadCode(settings.globalHeadCode || "");
        setDefaultLang(settings.defaultLang || "en");
      }

      setRedirects(redirectList);
    } catch (err) {
      console.error("Error loading SEO panel data:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // Update form inputs when selected item changes
  useEffect(() => {
    if (selectedItem) {
      setSlug(selectedItem.slug || "");
      setSeoTitle(selectedItem.seoTitle || "");
      setSeoDesc(selectedItem.seoDesc || "");
      setSchemaMarkup(selectedItem.schemaMarkup || "");
      setHeaderScript(selectedItem.headerScript || "");
      setCanonicalUrl(selectedItem.canonicalUrl || "");
      setImageAlt(selectedItem.imageAlt || "");
      setOnPageMsg(null);
    }
  }, [selectedItem]);

  // Handle SEO Fields Update
  const handleSaveOnPage = async () => {
    if (!selectedItem) return;
    setSaveLoading(true);
    setOnPageMsg(null);

    const res = await updateSEOFields(selectedItem.id, selectedItem.type, {
      slug,
      seoTitle,
      seoDesc,
      schemaMarkup,
      headerScript,
      canonicalUrl,
      imageAlt,
    });

    if (res.success) {
      setOnPageMsg({ type: "success", text: "SEO attributes updated and pushed live!" });
      
      // Update local content list state
      setItems((prev) =>
        prev.map((item) =>
          item.id === selectedItem.id
            ? { ...item, slug, seoTitle, seoDesc, schemaMarkup, headerScript, canonicalUrl, imageAlt }
            : item
        )
      );
    } else {
      setOnPageMsg({ type: "error", text: res.error || "Failed to update settings" });
    }
    setSaveLoading(false);
  };

  // Handle Global Site Settings Update
  const handleSaveSiteSettings = async (section: "technical" | "integrations") => {
    if (section === "technical") setTechnicalLoading(true);
    if (section === "integrations") setIntegrationsLoading(true);
    
    if (section === "technical") setTechnicalMsg(null);
    if (section === "integrations") setIntegrationsMsg(null);

    const res = await updateSiteSettings({
      gaTrackingId,
      gtmContainerId,
      gscVerification,
      robotsTxt,
      globalHeadCode,
      defaultLang,
    });

    if (res.success) {
      const successPayload = { type: "success" as const, text: "Global settings updated and active!" };
      if (section === "technical") setTechnicalMsg(successPayload);
      if (section === "integrations") setIntegrationsMsg(successPayload);
    } else {
      const errorPayload = { type: "error" as const, text: res.error || "Failed to save settings." };
      if (section === "technical") setTechnicalMsg(errorPayload);
      if (section === "integrations") setIntegrationsMsg(errorPayload);
    }

    setTechnicalLoading(false);
    setIntegrationsLoading(false);
  };

  // Handle Redirect Creation
  const handleAddRedirect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromPath || !toPath) return;

    setRedirectLoading(true);
    setRedirectMsg(null);

    const res = await createRedirect(fromPath, toPath, statusCode);

    if (res.success) {
      setRedirectMsg({ type: "success", text: "Redirect mapping registered successfully!" });
      setFromPath("");
      setToPath("");
      
      // Refresh list
      const updatedList = await getRedirects();
      setRedirects(updatedList);
    } else {
      setRedirectMsg({ type: "error", text: res.error || "Failed to create redirect mapping." });
    }
    setRedirectLoading(false);
  };

  // Handle Redirect Deletion
  const handleDeleteRedirect = async (id: string) => {
    if (!confirm("Are you sure you want to delete this redirect?")) return;
    
    const res = await deleteRedirect(id);
    if (res.success) {
      setRedirects((prev) => prev.filter((r) => r.id !== id));
    } else {
      alert("Failed to delete redirect.");
    }
  };

  // Auto-fill Schema Templates
  const handleApplyTemplate = (type: typeof selectedTemplate) => {
    setSelectedTemplate(type);
    if (type === "faq") {
      setSchemaMarkup(JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does dynamic SEO management work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It fetches configured titles, metadata, and scripts dynamically from our backend database on page request."
            }
          }
        ]
      }, null, 2));
    } else if (type === "article") {
      setSchemaMarkup(JSON.stringify({
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": selectedItem?.title || "Target Post Headline",
        "image": ["https://kazzona.com/default-preview.jpg"],
        "datePublished": new Date().toISOString(),
        "author": {
          "@type": "Organization",
          "name": "Kazzona Marketing",
          "url": "https://kazzona.com"
        }
      }, null, 2));
    } else if (type === "org") {
      setSchemaMarkup(JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Kazzona Marketing",
        "url": "https://kazzona.com",
        "logo": "https://kazzona.com/logo.png",
        "sameAs": [
          "https://www.instagram.com/kazzona_marketingagency"
        ]
      }, null, 2));
    } else {
      setSchemaMarkup("");
    }
  };

  // Filters
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.slug.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "ALL" || item.type === filterType;
    return matchesSearch && matchesType;
  });

  // Get live public URL
  const getPublicUrl = (item: SEOContentItem) => {
    if (item.type === "BLOG") {
      return `/blog/${item.slug}`;
    }
    if (item.slug === "home") {
      return `/`;
    }
    return `/${item.slug}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">SEO Command Center</h2>
          <p className="text-muted-foreground mt-1">Configure On-page meta, dynamic sitemaps, 301 redirects, robots.txt, and tracking pixels live.</p>
        </div>
        <Button 
          variant="outline" 
          onClick={loadData} 
          disabled={loading}
          className="border-border/40 hover:bg-secondary/15 flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Panel
        </Button>
      </div>

      {/* Primary Tab Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-border/40 pb-px">
        {[
          { id: "onpage", label: "📝 On-Page SEO", desc: "Meta tags, dynamic slug editor, canonical & schema markup" },
          { id: "technical", label: "⚙️ Technical SEO", desc: "Robots.txt config, XML sitemaps, structured schemas" },
          { id: "redirects", label: "🔗 Redirects", desc: "Dynamic 301 & 302 request redirect manager" },
          { id: "i18n", label: "🌐 i18n & Mobile", desc: "Locales status & hreflang generation controls" },
          { id: "performance", label: "🚀 Performance", desc: "Speed optimization and compiler caching stats" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === tab.id 
                ? "border-primary text-primary bg-primary/5" 
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Tab Area */}
      {activeTab === "onpage" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Side: Search & Pages list */}
          <Card className="lg:col-span-5 bg-card border-border/40 flex flex-col h-[750px] overflow-hidden">
            <CardHeader className="p-4 border-b border-border/40">
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                Select Page or Post
              </CardTitle>
              <CardDescription>Configure fields below to audit individual SEO configurations.</CardDescription>
              
              <div className="relative mt-4">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by title or slug..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-secondary/15 border border-border/40 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="flex gap-1.5 mt-3 bg-secondary/15 p-1 rounded-lg border border-border/20">
                {(["ALL", "BLOG", "PAGE"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type)}
                    className={`flex-1 text-center py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      filterType === type 
                        ? "bg-primary text-primary-foreground shadow" 
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {type === "ALL" ? "All Content" : type === "BLOG" ? "Blog Posts" : "Landing Pages"}
                  </button>
                ))}
              </div>
            </CardHeader>

            <CardContent className="p-0 overflow-y-auto flex-1 divide-y divide-border/20">
              {loading ? (
                <div className="flex justify-center items-center py-12 h-48">
                  <span className="animate-pulse text-muted-foreground text-sm">Loading dynamic database pages...</span>
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground text-sm">
                  No matching content items found.
                </div>
              ) : (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`p-4 cursor-pointer transition-all flex flex-col gap-1.5 ${
                      selectedItem?.id === item.id 
                        ? "bg-primary/10 border-l-4 border-l-primary" 
                        : "hover:bg-secondary/10 border-l-4 border-l-transparent"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-heading font-semibold text-sm line-clamp-1 text-foreground">
                        {item.title}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase shrink-0 ${
                        item.type === "BLOG"
                          ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                          : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      }`}>
                        {item.type}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span className="font-mono truncate max-w-[200px]">{getPublicUrl(item)}</span>
                      <span className={`text-[10px] font-bold ${item.published ? 'text-emerald-400' : 'text-amber-500'}`}>
                        {item.published ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Right Side: On-Page Form Editor */}
          <Card className="lg:col-span-7 bg-card border-border/40 min-h-[750px] flex flex-col overflow-hidden">
            {selectedItem ? (
              <div className="flex flex-col h-full">
                <CardHeader className="border-b border-border/40 p-6 flex flex-row items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl font-bold">{selectedItem.title}</CardTitle>
                      <a 
                        href={getPublicUrl(selectedItem)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        title="View live page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <CardDescription className="font-mono text-xs mt-1 text-primary">
                      Dynamic URL Path: {getPublicUrl(selectedItem)}
                    </CardDescription>
                  </div>
                  
                  <Button 
                    onClick={handleSaveOnPage} 
                    disabled={saveLoading}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 shadow cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {saveLoading ? "Publishing Updates..." : "Save & Live Push"}
                  </Button>
                </CardHeader>

                <CardContent className="p-6 space-y-6 overflow-y-auto flex-1 max-h-[640px]">
                  {onPageMsg && (
                    <div className={`p-4 rounded-xl text-sm flex items-start gap-3 border transition-all ${
                      onPageMsg.type === 'error' 
                        ? 'bg-destructive/10 text-destructive border-destructive/20' 
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>{onPageMsg.text}</span>
                    </div>
                  )}

                  {/* Dynamic Slug Editor */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-extrabold tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Link2 className="w-3.5 h-3.5 text-primary" />
                      Custom URL Slug
                    </label>
                    <div className="flex items-center">
                      <span className="bg-secondary/40 border border-r-0 border-border/40 px-3 py-2 rounded-l-xl text-sm text-muted-foreground font-mono">
                        {selectedItem.type === "BLOG" ? "/blog/" : "/"}
                      </span>
                      <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                        className="flex-1 bg-secondary/15 border border-border/40 rounded-r-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono"
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground">Changes the public URL route dynamically without losing search signals or SEO rank authority.</p>
                  </div>

                  {/* Meta Title */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs uppercase font-extrabold tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        Meta Title Tag
                      </label>
                      <span className={`text-[10px] font-bold ${seoTitle.length >= 50 && seoTitle.length <= 60 ? 'text-emerald-400' : 'text-muted-foreground'}`}>
                        {seoTitle.length} / 60 characters
                      </span>
                    </div>
                    <input
                      type="text"
                      value={seoTitle}
                      onChange={(e) => setSeoTitle(e.target.value)}
                      placeholder="Enter optimized title..."
                      className="w-full bg-secondary/15 border border-border/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <p className="text-[10px] text-muted-foreground">Optimal length is 50-60 characters. Avoid keyword stuffing.</p>
                  </div>

                  {/* Meta Description */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs uppercase font-extrabold tracking-wider text-muted-foreground flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-blue-500" />
                        Meta Description Tag
                      </label>
                      <span className={`text-[10px] font-bold ${seoDesc.length >= 150 && seoDesc.length <= 160 ? 'text-emerald-400' : 'text-muted-foreground'}`}>
                        {seoDesc.length} / 160 characters
                      </span>
                    </div>
                    <textarea
                      value={seoDesc}
                      onChange={(e) => setSeoDesc(e.target.value)}
                      placeholder="Enter brief description tag..."
                      rows={3}
                      className="w-full bg-secondary/15 border border-border/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <p className="text-[10px] text-muted-foreground">Optimal length is 150-160 characters for CTR snippet in Google search results.</p>
                  </div>

                  {/* Canonical Link */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-extrabold tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Share2 className="w-3.5 h-3.5 text-teal-400" />
                      Canonical URL Tag
                    </label>
                    <input
                      type="text"
                      value={canonicalUrl}
                      onChange={(e) => setCanonicalUrl(e.target.value)}
                      placeholder={`https://kazzona.com${getPublicUrl(selectedItem)}`}
                      className="w-full bg-secondary/15 border border-border/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono"
                    />
                    <p className="text-[10px] text-muted-foreground">Explicitly specifies preferred canonical URL address to resolve duplication issues.</p>
                  </div>

                  {/* Image Alt Tag */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-extrabold tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-emerald-400" />
                      Feature Image Alt Text
                    </label>
                    <input
                      type="text"
                      value={imageAlt}
                      onChange={(e) => setImageAlt(e.target.value)}
                      placeholder="Descriptive alternate text for images..."
                      className="w-full bg-secondary/15 border border-border/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <p className="text-[10px] text-muted-foreground">Increases dynamic search accessibility rankings on Google Images.</p>
                  </div>

                  {/* JSON-LD Schema Markup */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-extrabold tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Braces className="w-3.5 h-3.5 text-purple-400" />
                      JSON-LD Structured Schema Markup
                    </label>
                    <textarea
                      value={schemaMarkup}
                      onChange={(e) => setSchemaMarkup(e.target.value)}
                      placeholder='{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Example Content headline"
}'
                      rows={6}
                      className="w-full bg-secondary/10 border border-border/40 rounded-xl p-4 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <p className="text-[10px] text-muted-foreground">Paste JSON-LD directly here. Schema helper templates are available in Technical tab.</p>
                  </div>

                  {/* Custom Header Script */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-extrabold tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Code className="w-3.5 h-3.5 text-red-400" />
                      Custom Header Scripts Injection
                    </label>
                    <textarea
                      value={headerScript}
                      onChange={(e) => setHeaderScript(e.target.value)}
                      placeholder="<!-- Paste tracking pixels, page specific styles, meta tags, scripts -->"
                      rows={5}
                      className="w-full bg-secondary/10 border border-border/40 rounded-xl p-4 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <p className="text-[10px] text-muted-foreground">Code is dynamically appended inside the head section for this page only.</p>
                  </div>
                </CardContent>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-muted-foreground">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4">
                  <Globe className="w-8 h-8 text-muted-foreground/60" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">No Content Selected</h3>
                <p className="text-sm max-w-sm">
                  Select any active page or post on the left to edit its custom metadata, dynamic URL slug, canonical links, and schemas.
                </p>
              </div>
            )}
          </Card>
        </div>
      )}

      {activeTab === "technical" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Robots.txt and Sitemap configurations */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="bg-card border-border/40">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-primary" />
                  Robots.txt Editor
                </CardTitle>
                <CardDescription>Configure instruction crawl rules dynamically for index engines.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {technicalMsg && (
                  <div className={`p-4 rounded-xl text-sm flex items-start gap-3 border transition-all ${
                    technicalMsg.type === 'error' 
                      ? 'bg-destructive/10 text-destructive border-destructive/20' 
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{technicalMsg.text}</span>
                  </div>
                )}

                <textarea
                  value={robotsTxt}
                  onChange={(e) => setRobotsTxt(e.target.value)}
                  rows={10}
                  className="w-full bg-secondary/10 border border-border/40 rounded-xl p-4 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                
                <div className="flex justify-between items-center pt-2">
                  <span className="text-xs text-muted-foreground">Changes take effect instantly at <a href="/robots.txt" target="_blank" className="underline font-bold text-primary font-mono">/robots.txt</a>.</span>
                  <Button 
                    onClick={() => handleSaveSiteSettings("technical")} 
                    disabled={technicalLoading}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 shadow cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    {technicalLoading ? "Saving Robots.txt..." : "Save Robots.txt"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/40">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Globe className="w-5 h-5 text-emerald-400" />
                  XML Sitemap Configuration
                </CardTitle>
                <CardDescription>Self-updating, fully structured site indexes generated dynamically on the fly.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-secondary/10 border border-border/20 rounded-xl flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-foreground">Sitemap URL Address</div>
                    <div className="text-xs text-muted-foreground font-mono">https://kazzona.com/sitemap.xml</div>
                  </div>
                  <a 
                    href="/sitemap.xml" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-primary font-bold hover:underline"
                  >
                    Open Live Sitemap <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border border-border/40 rounded-xl space-y-1">
                    <div className="text-xs text-muted-foreground">Auto-updates on content publish</div>
                    <div className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Activated & Dynamic
                    </div>
                  </div>
                  <div className="p-4 border border-border/40 rounded-xl space-y-1">
                    <div className="text-xs text-muted-foreground">HTTPS Enforcement</div>
                    <div className="text-sm font-bold text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" /> Enabled SSL
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Structured schema helpers and templates */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="bg-card border-border/40">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Braces className="w-5 h-5 text-purple-400" />
                  Structured Schema Generator
                </CardTitle>
                <CardDescription>Select a schema type to generate and insert semantic structures on selected pages.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-muted-foreground">
                  Select a template to generate semantic JSON-LD structures. You can then copy/paste this code directly into the schema field of any content page or post.
                </p>

                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    { id: "article", label: "📰 Blog Article Schema", desc: "For dynamic and informational blog pages" },
                    { id: "faq", label: "❓ FAQ Accordion Schema", desc: "Implements Google accordion search result snippets" },
                    { id: "org", label: "🏢 Enterprise Organization Schema", desc: "Best applied to the primary Home Page" },
                  ].map((temp) => (
                    <button
                      key={temp.id}
                      onClick={() => handleApplyTemplate(temp.id as any)}
                      className={`p-3 text-left border rounded-xl transition-all cursor-pointer flex flex-col gap-1 ${
                        selectedTemplate === temp.id 
                          ? "border-primary bg-primary/5 text-foreground" 
                          : "border-border/40 bg-secondary/5 text-muted-foreground hover:text-foreground hover:bg-secondary/10"
                      }`}
                    >
                      <span className="text-sm font-bold text-foreground">{temp.label}</span>
                      <span className="text-[10px]">{temp.desc}</span>
                    </button>
                  ))}
                </div>

                {selectedTemplate !== "none" && (
                  <div className="space-y-2 animate-in fade-in zoom-in-95 duration-200">
                    <label className="text-xs font-bold text-muted-foreground">Generated Schema Code Output</label>
                    <textarea
                      readOnly
                      value={schemaMarkup}
                      rows={8}
                      className="w-full bg-black/40 border border-border/40 rounded-xl p-3 text-[10px] font-mono text-emerald-400 focus:outline-none"
                    />
                    <p className="text-[10px] text-muted-foreground text-center">Copy this code and paste it inside any page's Schema Markup editor on the On-Page tab.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "redirects" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Add Redirect Form */}
          <div className="lg:col-span-4">
            <Card className="bg-card border-border/40">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary" />
                  Add Redirect Rule
                </CardTitle>
                <CardDescription>Map broken or outdated URL links dynamically to target destinations.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddRedirect} className="space-y-4">
                  {redirectMsg && (
                    <div className={`p-4 rounded-xl text-sm flex items-start gap-3 border transition-all ${
                      redirectMsg.type === 'error' 
                        ? 'bg-destructive/10 text-destructive border-destructive/20' 
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <span>{redirectMsg.text}</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground">From Relative Path *</label>
                    <input
                      type="text"
                      required
                      value={fromPath}
                      onChange={(e) => setFromPath(e.target.value)}
                      placeholder="/old-slug-path"
                      className="w-full bg-secondary/15 border border-border/40 rounded-xl px-4 py-2 text-sm focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground">To Path / URL *</label>
                    <input
                      type="text"
                      required
                      value={toPath}
                      onChange={(e) => setToPath(e.target.value)}
                      placeholder="/new-page-path"
                      className="w-full bg-secondary/15 border border-border/40 rounded-xl px-4 py-2 text-sm focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground">Redirect Status Code</label>
                    <select
                      value={statusCode}
                      onChange={(e) => setStatusCode(parseInt(e.target.value))}
                      className="w-full bg-secondary/15 border border-border/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none cursor-pointer"
                    >
                      <option value={301}>301 (Permanent Redirect)</option>
                      <option value={302}>302 (Temporary Redirect)</option>
                    </select>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={redirectLoading}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center gap-2 shadow cursor-pointer font-bold"
                  >
                    <Plus className="w-4 h-4" />
                    {redirectLoading ? "Creating Mapping..." : "Register Redirect"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Active Redirect Rules Table */}
          <div className="lg:col-span-8">
            <Card className="bg-card border-border/40 h-[600px] flex flex-col overflow-hidden">
              <CardHeader className="border-b border-border/40">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Link2 className="w-5 h-5 text-emerald-400" />
                  Active Redirect Rules
                </CardTitle>
                <CardDescription>Listing current live status mappings for site requests.</CardDescription>
              </CardHeader>
              <CardContent className="p-0 overflow-y-auto flex-1">
                {redirects.length === 0 ? (
                  <div className="p-12 text-center text-muted-foreground text-sm">
                    No active redirect mapping rules discovered.
                  </div>
                ) : (
                  <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground bg-secondary/20 uppercase border-b border-border/40">
                      <tr>
                        <th className="px-6 py-4">Source Route</th>
                        <th className="px-6 py-4">Target Destination</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                      {redirects.map((r) => (
                        <tr key={r.id} className="hover:bg-secondary/5 transition-colors">
                          <td className="px-6 py-4 font-mono text-xs font-bold text-foreground">{r.fromPath}</td>
                          <td className="px-6 py-4 font-mono text-xs text-primary truncate max-w-[200px]">{r.toPath}</td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              {r.statusCode}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDeleteRedirect(r.id)}
                              className="text-muted-foreground hover:text-destructive cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "integrations" && (
        <div className="max-w-3xl mx-auto">
          <Card className="bg-card border-border/40">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Sliders className="w-5 h-5 text-primary" />
                Global Analytics & Verification Injection
              </CardTitle>
              <CardDescription>Insert tracking pixels, verify search console attributes, and manage global header custom elements safely.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {integrationsMsg && (
                <div className={`p-4 rounded-xl text-sm flex items-start gap-3 border transition-all ${
                  integrationsMsg.type === 'error' 
                    ? 'bg-destructive/10 text-destructive border-destructive/20' 
                    : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}>
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{integrationsMsg.text}</span>
                </div>
              )}

              {/* GA4 */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-extrabold tracking-wider text-muted-foreground">Google Analytics (GA4) Measurement ID</label>
                <input
                  type="text"
                  value={gaTrackingId}
                  onChange={(e) => setGaTrackingId(e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                  className="w-full bg-secondary/15 border border-border/40 rounded-xl px-4 py-2 text-sm focus:outline-none"
                />
                <p className="text-[10px] text-muted-foreground">Appends dynamic global tracking gtag snippet on every public layout automatically.</p>
              </div>

              {/* GTM */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-extrabold tracking-wider text-muted-foreground">Google Tag Manager (GTM) Container ID</label>
                <input
                  type="text"
                  value={gtmContainerId}
                  onChange={(e) => setGtmContainerId(e.target.value)}
                  placeholder="GTM-XXXXXXX"
                  className="w-full bg-secondary/15 border border-border/40 rounded-xl px-4 py-2 text-sm focus:outline-none"
                />
                <p className="text-[10px] text-muted-foreground">Injects GTM script tag globally for unified tag management configurations.</p>
              </div>

              {/* GSC */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-extrabold tracking-wider text-muted-foreground">Google Search Console Verification Code</label>
                <input
                  type="text"
                  value={gscVerification}
                  onChange={(e) => setGscVerification(e.target.value)}
                  placeholder="google-site-verification-code"
                  className="w-full bg-secondary/15 border border-border/40 rounded-xl px-4 py-2 text-sm focus:outline-none font-mono"
                />
                <p className="text-[10px] text-muted-foreground">Enter verification ID to render global site verification meta tags automatically.</p>
              </div>

              {/* Global Head Code */}
              <div className="space-y-1.5">
                <label className="text-xs uppercase font-extrabold tracking-wider text-muted-foreground">Global Custom Head Code Injection</label>
                <textarea
                  value={globalHeadCode}
                  onChange={(e) => setGlobalHeadCode(e.target.value)}
                  placeholder="<!-- Inject meta tags, stylesheets, and custom headers globally -->"
                  rows={5}
                  className="w-full bg-secondary/10 border border-border/40 rounded-xl p-4 text-xs font-mono focus:outline-none"
                />
                <p className="text-[10px] text-muted-foreground">Code is injected on all public templates dynamically inside standard header layers.</p>
              </div>

              <div className="flex justify-end pt-4 border-t border-border/40">
                <Button 
                  onClick={() => handleSaveSiteSettings("integrations")} 
                  disabled={integrationsLoading}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 shadow cursor-pointer font-bold px-6"
                >
                  <Save className="w-4 h-4" />
                  {integrationsLoading ? "Publishing Integrations..." : "Save configurations"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "i18n" && (
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="bg-card border-border/40">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Languages className="w-5 h-5 text-primary" />
                Internationalization (i18n) Status Check
              </CardTitle>
              <CardDescription>Dynamic hreflang configurations and site localization indexes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs uppercase font-extrabold tracking-wider text-muted-foreground">Default Primary Locale Lang</label>
                <select
                  value={defaultLang}
                  onChange={(e) => setDefaultLang(e.target.value)}
                  className="w-full bg-secondary/15 border border-border/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none cursor-pointer"
                >
                  <option value="en">English (en-US / en-IN)</option>
                  <option value="hi">Hindi (hi-IN)</option>
                  <option value="es">Spanish (es-ES)</option>
                </select>
              </div>

              <div className="p-4 border border-border/40 rounded-xl space-y-2">
                <div className="text-sm font-bold text-foreground">Localization Tagging</div>
                <p className="text-xs text-muted-foreground">
                  The frontend template is configured to render standard <code>{`lang="${defaultLang}"`}</code> HTML headers. 
                  Automatic <code>hreflang</code> alternates are generated on dynamic routes for optimal international search engine crawling indices.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/40">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                Mobile Responsive Audit Status
              </CardTitle>
              <CardDescription>Verified mobile friendly layouts for active public pages.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <div>
                  <div className="text-sm font-bold">100% Responsive Templates Configured</div>
                  <div className="text-xs text-emerald-500/80">Tailwind viewport configurations guarantee layout compatibility on all smartphones and mobile screens.</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "performance" && (
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="bg-card border-border/40">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Speed & Performance Optimizer
              </CardTitle>
              <CardDescription>Overview of built-in Next.js page generation speed configurations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 divide-y divide-border/20">
              <div className="pt-0 pb-4 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-sm font-bold text-foreground">Dynamic WebP Image Compression</span>
                </div>
                <p className="text-xs text-muted-foreground">Uploaded media layouts are served via responsive Next.js optimizer, converting uploads to modern lightweight formats (like WebP) on generation.</p>
              </div>

              <div className="py-4 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-sm font-bold text-foreground">Native Lazy Loading Enabled</span>
                </div>
                <p className="text-xs text-muted-foreground">All images and dynamic media components include standard HTML <code>loading="lazy"</code> attributes to keep initial page weights minimal.</p>
              </div>

              <div className="py-4 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-sm font-bold text-foreground">Server & Client Caching Active</span>
                </div>
                <p className="text-xs text-muted-foreground">Next.js App router leverages route-level prefetching and background route static compilations to ensure rapid Time to First Byte (TTFB).</p>
              </div>

              <div className="pt-4 pb-0 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span className="text-sm font-bold text-foreground">Code Minification Out of the Box</span>
                </div>
                <p className="text-xs text-muted-foreground">Build builds execute standard SWC bundling options, compressing all structural HTML, dynamic CSS layers, and compiled JS files automatically.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
