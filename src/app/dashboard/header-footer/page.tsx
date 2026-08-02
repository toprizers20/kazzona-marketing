"use client";

import { useState, useEffect } from "react";
import { 
  PanelTop, 
  Save, 
  Plus, 
  Trash2, 
  ChevronDown, 
  ChevronUp, 
  Link2, 
  ArrowUp, 
  ArrowDown, 
  Mail, 
  Phone, 
  MapPin, 
  Smartphone, 
  Monitor, 
  ExternalLink,
  Loader2,
  CheckCircle,
  HelpCircle,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { 
  getHeaderFooterConfig, 
  saveHeaderConfig, 
  saveFooterConfig, 
  getNavigationOptions 
} from "@/app/actions/header-footer";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

interface HeaderConfig {
  logoText: string;
  logoUrl: string;
  logoHeight: number;
  logoWidth: number;
  navigationItems: NavItem[];
  ctaText: string;
  ctaHref: string;
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

interface FooterConfig {
  columnsCount: number;
  columns: FooterColumn[];
  copyrightText: string;
  bottomLinks: FooterLink[];
}

export default function HeaderFooterBuilder() {
  const [activeTab, setActiveTab] = useState<"header" | "footer">("header");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  // Builder Configurations
  const [headerConfig, setHeaderConfig] = useState<HeaderConfig>({
    logoText: "Kazzona Marketing",
    logoUrl: "",
    logoHeight: 32,
    logoWidth: 32,
    navigationItems: [],
    ctaText: "Free Strategy Call",
    ctaHref: "/contact"
  });

  const [footerConfig, setFooterConfig] = useState<FooterConfig>({
    columnsCount: 4,
    columns: [],
    copyrightText: "",
    bottomLinks: []
  });

  // Navigation targets dropdown options
  const [linkTargets, setLinkTargets] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [configRes, optionsRes] = await Promise.all([
          getHeaderFooterConfig(),
          getNavigationOptions()
        ]);
        
        if (configRes.header) setHeaderConfig(configRes.header);
        if (configRes.footer) setFooterConfig(configRes.footer);
        
        if (optionsRes.options) {
          setLinkTargets(optionsRes.options);
        }
      } catch (err) {
        console.error("Failed to load header/footer builder settings:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const triggerToast = (text: string, type: "success" | "error" = "success") => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleSaveHeader = async () => {
    setIsSaving(true);
    try {
      const res = await saveHeaderConfig(headerConfig);
      if (res.success) {
        triggerToast("Header configuration saved successfully!");
      } else {
        triggerToast(res.error || "Failed to save header configuration", "error");
      }
    } catch (err) {
      triggerToast("An unexpected error occurred", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveFooter = async () => {
    setIsSaving(true);
    try {
      const res = await saveFooterConfig(footerConfig);
      if (res.success) {
        triggerToast("Footer configuration saved successfully!");
      } else {
        triggerToast(res.error || "Failed to save footer configuration", "error");
      }
    } catch (err) {
      triggerToast("An unexpected error occurred", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // Header helpers
  const updateHeaderField = (field: keyof HeaderConfig, value: any) => {
    setHeaderConfig(prev => ({ ...prev, [field]: value }));
  };

  const addHeaderLink = () => {
    setHeaderConfig(prev => ({
      ...prev,
      navigationItems: [...prev.navigationItems, { label: "New Link", href: "/" }]
    }));
  };

  const removeHeaderLink = (index: number) => {
    setHeaderConfig(prev => {
      const newItems = [...prev.navigationItems];
      newItems.splice(index, 1);
      return { ...prev, navigationItems: newItems };
    });
  };

  const moveHeaderLink = (index: number, direction: "up" | "down") => {
    setHeaderConfig(prev => {
      const newItems = [...prev.navigationItems];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newItems.length) return prev;
      
      const temp = newItems[index];
      newItems[index] = newItems[targetIndex];
      newItems[targetIndex] = temp;
      
      return { ...prev, navigationItems: newItems };
    });
  };

  const updateHeaderLink = (index: number, field: "label" | "href", value: string) => {
    setHeaderConfig(prev => {
      const newItems = [...prev.navigationItems];
      newItems[index] = { ...newItems[index], [field]: value };
      return { ...prev, navigationItems: newItems };
    });
  };

  const toggleHeaderLinkDropdown = (index: number) => {
    setHeaderConfig(prev => {
      const newItems = [...prev.navigationItems];
      const item = newItems[index];
      if (item.children) {
        delete item.children;
      } else {
        item.children = [{ label: "Sub Link 1", href: "/" }];
      }
      return { ...prev, navigationItems: newItems };
    });
  };

  // Sub link helpers
  const addHeaderSubLink = (parentIndex: number) => {
    setHeaderConfig(prev => {
      const newItems = [...prev.navigationItems];
      const parent = newItems[parentIndex];
      const children = parent.children ? [...parent.children] : [];
      children.push({ label: "New Sub Link", href: "/" });
      newItems[parentIndex] = { ...parent, children };
      return { ...prev, navigationItems: newItems };
    });
  };

  const removeHeaderSubLink = (parentIndex: number, childIndex: number) => {
    setHeaderConfig(prev => {
      const newItems = [...prev.navigationItems];
      const parent = newItems[parentIndex];
      if (!parent.children) return prev;
      const children = [...parent.children];
      children.splice(childIndex, 1);
      newItems[parentIndex] = { ...parent, children };
      return { ...prev, navigationItems: newItems };
    });
  };

  const updateHeaderSubLink = (parentIndex: number, childIndex: number, field: "label" | "href", value: string) => {
    setHeaderConfig(prev => {
      const newItems = [...prev.navigationItems];
      const parent = newItems[parentIndex];
      if (!parent.children) return prev;
      const children = [...parent.children];
      children[childIndex] = { ...children[childIndex], [field]: value };
      newItems[parentIndex] = { ...parent, children };
      return { ...prev, navigationItems: newItems };
    });
  };

  // Footer helpers
  const updateFooterField = (field: keyof FooterConfig, value: any) => {
    setFooterConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleColumnsCountChange = (count: number) => {
    const cleanCount = Math.max(1, Math.min(5, count));
    setFooterConfig(prev => {
      let newCols = [...prev.columns];
      if (newCols.length < cleanCount) {
        // Add default columns
        for (let i = newCols.length; i < cleanCount; i++) {
          newCols.push({
            title: `Column ${i + 1}`,
            type: "links",
            links: [{ label: "Contact Us", href: "/contact" }]
          });
        }
      } else if (newCols.length > cleanCount) {
        newCols = newCols.slice(0, cleanCount);
      }
      return { ...prev, columnsCount: cleanCount, columns: newCols };
    });
  };

  const updateFooterColumn = (index: number, updatedCol: Partial<FooterColumn>) => {
    setFooterConfig(prev => {
      const newCols = [...prev.columns];
      newCols[index] = { ...newCols[index], ...updatedCol } as FooterColumn;
      return { ...prev, columns: newCols };
    });
  };

  const addFooterColumnLink = (colIndex: number) => {
    const col = footerConfig.columns[colIndex];
    const links = col.links ? [...col.links] : [];
    links.push({ label: "New Link", href: "/" });
    updateFooterColumn(colIndex, { links });
  };

  const removeFooterColumnLink = (colIndex: number, linkIndex: number) => {
    const col = footerConfig.columns[colIndex];
    if (!col.links) return;
    const links = [...col.links];
    links.splice(linkIndex, 1);
    updateFooterColumn(colIndex, { links });
  };

  const updateFooterColumnLink = (colIndex: number, linkIndex: number, field: "label" | "href", value: string) => {
    const col = footerConfig.columns[colIndex];
    if (!col.links) return;
    const links = [...col.links];
    links[linkIndex] = { ...links[linkIndex], [field]: value };
    updateFooterColumn(colIndex, { links });
  };

  // Social link helpers for contact column
  const updateFooterSocialLink = (colIndex: number, socialIndex: number, field: "platform" | "href", value: string) => {
    const col = footerConfig.columns[colIndex];
    const socials = col.socials ? [...col.socials] : [];
    socials[socialIndex] = { ...socials[socialIndex], [field]: value };
    updateFooterColumn(colIndex, { socials });
  };

  // Footer bottom links helpers
  const addFooterBottomLink = () => {
    setFooterConfig(prev => ({
      ...prev,
      bottomLinks: [...prev.bottomLinks, { label: "New Link", href: "/" }]
    }));
  };

  const removeFooterBottomLink = (index: number) => {
    setFooterConfig(prev => {
      const newLinks = [...prev.bottomLinks];
      newLinks.splice(index, 1);
      return { ...prev, bottomLinks: newLinks };
    });
  };

  const updateFooterBottomLink = (index: number, field: "label" | "href", value: string) => {
    setFooterConfig(prev => {
      const newLinks = [...prev.bottomLinks];
      newLinks[index] = { ...newLinks[index], [field]: value };
      return { ...prev, bottomLinks: newLinks };
    });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
        <p className="text-muted-foreground animate-pulse text-sm">Loading dynamic layouts config...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16">
      
      {/* Toast Alert */}
      {statusMessage && (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl transition-all duration-300 animate-in slide-in-from-bottom-5 ${
          statusMessage.type === "success" 
            ? "bg-emerald-950/90 border-emerald-500/30 text-emerald-300" 
            : "bg-destructive/90 border-destructive/30 text-destructive-foreground"
        }`}>
          <CheckCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-medium">{statusMessage.text}</span>
        </div>
      )}

      {/* Top Banner and Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Header & Footer Customizer</h2>
          <p className="text-muted-foreground text-sm">Dynamically design layout styles, navigation menus, logos, and footer links.</p>
        </div>
        <div className="flex bg-card border border-border/40 p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab("header")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === "header" ? "bg-primary text-white shadow" : "text-muted-foreground hover:text-foreground"}`}
          >
            Header Builder
          </button>
          <button 
            onClick={() => setActiveTab("footer")}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === "footer" ? "bg-primary text-white shadow" : "text-muted-foreground hover:text-foreground"}`}
          >
            Footer Builder
          </button>
        </div>
      </div>

      {/* Dynamic Live Preview Panel */}
      <Card className="border border-border/40 bg-card/65 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
        <CardHeader className="flex flex-row items-center justify-between border-b border-border/40 pb-4">
          <div>
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-primary">Live Layout Preview</CardTitle>
            <CardDescription className="text-xs">Visualizing layout configuration on front-end pages.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant={previewDevice === "desktop" ? "secondary" : "ghost"} 
              size="icon" 
              onClick={() => setPreviewDevice("desktop")}
              className="h-8 w-8 rounded-lg"
            >
              <Monitor className="w-4 h-4" />
            </Button>
            <Button 
              variant={previewDevice === "mobile" ? "secondary" : "ghost"} 
              size="icon" 
              onClick={() => setPreviewDevice("mobile")}
              className="h-8 w-8 rounded-lg"
            >
              <Smartphone className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 bg-secondary/5">
          {activeTab === "header" ? (
            /* Live Header Mock View */
            <div className={`mx-auto bg-background/95 border border-border/60 rounded-xl overflow-hidden shadow-inner transition-all duration-300 ${previewDevice === "mobile" ? "max-w-[360px]" : "w-full"}`}>
              <div className="p-4 flex items-center justify-between border-b border-border/30">
                {/* Logo mock */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xs" style={{ height: headerConfig.logoHeight, width: headerConfig.logoWidth }}>
                    {headerConfig.logoText.charAt(0)}
                  </div>
                  {previewDevice === "desktop" && (
                    <span className="font-heading font-bold text-sm text-foreground">
                      {headerConfig.logoText}
                    </span>
                  )}
                </div>

                {/* Desktop nav mock */}
                {previewDevice === "desktop" && (
                  <nav className="flex items-center gap-5 text-xs font-semibold text-muted-foreground">
                    {headerConfig.navigationItems.map((item, i) => (
                      <div key={i} className="flex items-center gap-0.5 group cursor-pointer relative py-1 hover:text-primary transition-colors">
                        <span>{item.label}</span>
                        {item.children && <ChevronDown className="w-3 h-3" />}
                        {item.children && (
                          <div className="absolute top-full left-0 mt-1 bg-card border border-border rounded-lg p-2 shadow-xl hidden group-hover:block min-w-[140px] z-20">
                            {item.children.map((child, ci) => (
                              <div key={ci} className="p-1 text-[11px] text-muted-foreground hover:text-primary">{child.label}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </nav>
                )}

                {/* CTA or Menu button mock */}
                <div className="flex items-center gap-3">
                  {previewDevice === "desktop" ? (
                    <div className="bg-primary text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm">
                      {headerConfig.ctaText}
                    </div>
                  ) : (
                    <div className="w-6 h-6 flex flex-col justify-between p-1.5 border border-border rounded cursor-pointer">
                      <div className="h-0.5 w-full bg-foreground" />
                      <div className="h-0.5 w-full bg-foreground" />
                      <div className="h-0.5 w-full bg-foreground" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Live Footer Mock View */
            <div className={`mx-auto bg-background/95 border border-border/60 rounded-xl p-6 shadow-inner transition-all duration-300 ${previewDevice === "mobile" ? "max-w-[360px]" : "w-full"}`}>
              <div className={`grid gap-6 ${previewDevice === "mobile" ? "grid-cols-1" : "grid-cols-4"}`} style={{ gridTemplateColumns: previewDevice === "desktop" ? `repeat(${footerConfig.columnsCount}, minmax(0, 1fr))` : undefined }}>
                {footerConfig.columns.map((col, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <div className="text-xs font-bold text-foreground border-b border-border/20 pb-1">{col.title || `Column ${idx + 1}`}</div>
                    
                    {col.type === "text" && (
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{col.content || "Empty text column config."}</p>
                    )}
                    
                    {col.type === "links" && (
                      <ul className="flex flex-col gap-1.5 text-[11px] text-muted-foreground">
                        {col.links?.map((link, li) => (
                          <li key={li} className="hover:text-primary transition-colors cursor-pointer flex items-center gap-1">
                            <Link2 className="w-2.5 h-2.5" />
                            {link.label}
                          </li>
                        ))}
                      </ul>
                    )}

                    {col.type === "contact" && (
                      <ul className="flex flex-col gap-1 text-[11px] text-muted-foreground">
                        {col.email && <li className="flex items-center gap-1"><Mail className="w-3 h-3 text-primary" /> {col.email}</li>}
                        {col.phone && <li className="flex items-center gap-1"><Phone className="w-3 h-3 text-primary" /> {col.phone}</li>}
                        {col.address && <li className="flex items-start gap-1"><MapPin className="w-3 h-3 text-primary mt-0.5" /> <span>{col.address}</span></li>}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-2 text-[10px] text-muted-foreground">
                <p>{footerConfig.copyrightText || "© 2026 Agency. All rights reserved."}</p>
                <div className="flex items-center gap-3">
                  {footerConfig.bottomLinks.map((link, idx) => (
                    <span key={idx} className="hover:text-primary transition-colors cursor-pointer">{link.label}</span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Editor Panels */}
      {activeTab === "header" ? (
        /* ==================== HEADER BUILDER EDITOR ==================== */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Logo & Settings Column */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border border-border/40 bg-card">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Branding Settings</CardTitle>
                <CardDescription className="text-xs">Adjust header brand identity logo and size dimensions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="logoText">Logo Text</Label>
                  <Input 
                    id="logoText" 
                    value={headerConfig.logoText} 
                    onChange={(e) => updateHeaderField("logoText", e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logoUrl">Logo Image URL (Optional)</Label>
                  <Input 
                    id="logoUrl" 
                    placeholder="/logo.png"
                    value={headerConfig.logoUrl} 
                    onChange={(e) => updateHeaderField("logoUrl", e.target.value)} 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="logoHeight">Height (px)</Label>
                    <Input 
                      id="logoHeight" 
                      type="number"
                      value={headerConfig.logoHeight} 
                      onChange={(e) => updateHeaderField("logoHeight", parseInt(e.target.value) || 32)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logoWidth">Width (px)</Label>
                    <Input 
                      id="logoWidth" 
                      type="number"
                      value={headerConfig.logoWidth} 
                      onChange={(e) => updateHeaderField("logoWidth", parseInt(e.target.value) || 32)} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border/40 bg-card">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Call to Action (CTA)</CardTitle>
                <CardDescription className="text-xs">Button visible on the desktop header header bar.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ctaText">Button Text</Label>
                  <Input 
                    id="ctaText" 
                    value={headerConfig.ctaText} 
                    onChange={(e) => updateHeaderField("ctaText", e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ctaHref">Button Destination URL</Label>
                  <Input 
                    id="ctaHref" 
                    value={headerConfig.ctaHref} 
                    onChange={(e) => updateHeaderField("ctaHref", e.target.value)} 
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t border-border/40 pt-4 flex justify-between">
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" /> Links can be relative like /contact
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* Navigation Links Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border border-border/40 bg-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">Navigation Link Structure</CardTitle>
                  <CardDescription className="text-xs">Build navigation menus, rearrange links, and set up nested drop-downs.</CardDescription>
                </div>
                <Button onClick={addHeaderLink} size="sm" className="rounded-xl flex items-center gap-1 bg-primary text-white">
                  <Plus className="w-4 h-4" /> Add Link
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                {headerConfig.navigationItems.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-border/40 rounded-2xl text-muted-foreground text-sm">
                    No navigation items found. Click &quot;Add Link&quot; to build your header.
                  </div>
                ) : (
                  headerConfig.navigationItems.map((item, index) => (
                    <div key={index} className="border border-border/40 rounded-xl p-4 bg-secondary/10 space-y-3">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded">
                            {index + 1}
                          </span>
                          <span className="font-semibold text-sm">{item.label || "Untitled Link"}</span>
                        </div>
                        <div className="flex items-center gap-1.5 self-end sm:self-auto">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            disabled={index === 0}
                            onClick={() => moveHeaderLink(index, "up")}
                            className="h-7 w-7 rounded"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            disabled={index === headerConfig.navigationItems.length - 1}
                            onClick={() => moveHeaderLink(index, "down")}
                            className="h-7 w-7 rounded"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => toggleHeaderLinkDropdown(index)}
                            className="text-xs h-7 px-2 rounded-lg"
                          >
                            {item.children ? "Remove Submenu" : "Add Submenu"}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeHeaderLink(index)}
                            className="h-7 w-7 text-destructive hover:bg-destructive/10 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>

                      {/* Main link inputs */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs">Link Label</Label>
                          <Input 
                            value={item.label} 
                            placeholder="e.g. Services"
                            onChange={(e) => updateHeaderLink(index, "label", e.target.value)} 
                          />
                        </div>
                        <div>
                          <Label className="text-xs flex items-center justify-between">
                            <span>Destination URL / Route</span>
                            <span className="text-[10px] text-muted-foreground">Select static page link</span>
                          </Label>
                          <div className="flex gap-2">
                            <Input 
                              value={item.href} 
                              placeholder="e.g. /services"
                              onChange={(e) => updateHeaderLink(index, "href", e.target.value)} 
                              className="flex-1"
                            />
                            <select 
                              onChange={(e) => {
                                if(e.target.value !== "custom") {
                                  updateHeaderLink(index, "href", e.target.value);
                                }
                              }}
                              className="bg-card border border-border/40 rounded-lg px-2 text-xs max-w-[120px] outline-none"
                              value={linkTargets.some(t => t.value === item.href) ? item.href : "custom"}
                            >
                              <option value="custom">-- Link Page --</option>
                              {linkTargets.slice(1).map((t, ti) => (
                                <option key={ti} value={t.value}>{t.label}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Dropdown child submenu items */}
                      {item.children && (
                        <div className="mt-3 pl-4 border-l-2 border-primary/30 space-y-3 bg-secondary/5 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-primary">Submenu Dropdown Items</span>
                            <Button onClick={() => addHeaderSubLink(index)} size="sm" variant="ghost" className="text-xs h-6 px-2 rounded-lg text-primary flex items-center gap-1">
                              <Plus className="w-3 h-3" /> Add Sub Item
                            </Button>
                          </div>
                          
                          {item.children.map((child, childIndex) => (
                            <div key={childIndex} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                              <div className="md:col-span-4">
                                <Label className="text-[10px]">Sub Link Label</Label>
                                <Input 
                                  value={child.label} 
                                  placeholder="e.g. SEO Services"
                                  className="h-8 text-xs"
                                  onChange={(e) => updateHeaderSubLink(index, childIndex, "label", e.target.value)} 
                                />
                              </div>
                              <div className="md:col-span-6 flex gap-2 items-center">
                                <div className="flex-1">
                                  <Label className="text-[10px]">Sub Link URL</Label>
                                  <Input 
                                    value={child.href} 
                                    placeholder="e.g. /services/seo"
                                    className="h-8 text-xs"
                                    onChange={(e) => updateHeaderSubLink(index, childIndex, "href", e.target.value)} 
                                  />
                                </div>
                                <select 
                                  onChange={(e) => {
                                    if(e.target.value !== "custom") {
                                      updateHeaderSubLink(index, childIndex, "href", e.target.value);
                                    }
                                  }}
                                  className="bg-card border border-border/40 rounded-lg px-2 h-8 text-[11px] max-w-[100px] mt-4"
                                  value={linkTargets.some(t => t.value === child.href) ? child.href : "custom"}
                                >
                                  <option value="custom">-- Link --</option>
                                  {linkTargets.slice(1).map((t, ti) => (
                                    <option key={ti} value={t.value}>{t.label}</option>
                                  ))}
                                </select>
                              </div>
                              <div className="md:col-span-2 text-right">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  onClick={() => removeHeaderSubLink(index, childIndex)}
                                  className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </CardContent>
              <CardFooter className="border-t border-border/40 pt-4 flex justify-end">
                <Button 
                  onClick={handleSaveHeader} 
                  disabled={isSaving}
                  className="rounded-xl bg-primary text-white shadow shadow-primary/20 flex items-center gap-2"
                >
                  {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Header Configurations
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        /* ==================== FOOTER BUILDER EDITOR ==================== */
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* General Settings Column */}
            <Card className="border border-border/40 bg-card lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Footer Columns Layout</CardTitle>
                <CardDescription className="text-xs">Configure how many sections appear in the footer grid.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="columnsCount">Number of Columns (1 - 5)</Label>
                  <Input 
                    id="columnsCount" 
                    type="number"
                    min={1}
                    max={5}
                    value={footerConfig.columnsCount}
                    onChange={(e) => handleColumnsCountChange(parseInt(e.target.value) || 4)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="copyrightText">Copyright Text</Label>
                  <Input 
                    id="copyrightText" 
                    value={footerConfig.copyrightText}
                    placeholder="© 2026 Kazzona Marketing. All rights reserved."
                    onChange={(e) => updateFooterField("copyrightText", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Columns Customizer */}
            <div className="lg:col-span-3 space-y-6">
              <Card className="border border-border/40 bg-card">
                <CardHeader>
                  <CardTitle className="text-base font-semibold">Edit Footer Grid Content</CardTitle>
                  <CardDescription className="text-xs">Manage individual column styles, headers, and values.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {footerConfig.columns.map((col, colIdx) => (
                    <div key={colIdx} className="border border-border/40 rounded-xl p-4 bg-secondary/10 space-y-4">
                      <div className="flex items-center justify-between border-b border-border/20 pb-2">
                        <span className="text-sm font-bold text-primary flex items-center gap-2">
                          <span className="w-5 h-5 rounded bg-primary text-white flex items-center justify-center text-xs font-bold">{colIdx + 1}</span>
                          Column Customization
                        </span>
                        
                        <div className="flex items-center gap-2">
                          <Label className="text-xs">Type:</Label>
                          <select 
                            value={col.type} 
                            onChange={(e) => updateFooterColumn(colIdx, { 
                              type: e.target.value as "text" | "links" | "contact",
                              // Preserve title or set defaults
                              title: col.title || `Column ${colIdx + 1}`,
                              content: col.content || "",
                              links: col.links || [],
                              email: col.email || "hello@agency.com",
                              phone: col.phone || "+91 98765 43210",
                              address: col.address || "Office Address",
                              socials: col.socials || [{ platform: "Twitter", href: "#" }]
                            })}
                            className="bg-card border border-border/40 rounded-lg px-2 py-1 text-xs outline-none"
                          >
                            <option value="text">Text Info / Paragraph</option>
                            <option value="links">Quick Links Menu</option>
                            <option value="contact">Contact Details & Socials</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">Column Title</Label>
                          <Input 
                            value={col.title} 
                            onChange={(e) => updateFooterColumn(colIdx, { title: e.target.value })} 
                          />
                        </div>

                        {col.type === "text" && (
                          <div className="space-y-1">
                            <Label className="text-xs font-medium">Text Body Content</Label>
                            <Textarea 
                              value={col.content || ""} 
                              placeholder="Insert short marketing copy, agency descriptions, etc."
                              rows={3}
                              onChange={(e) => updateFooterColumn(colIdx, { content: e.target.value })} 
                            />
                          </div>
                        )}

                        {col.type === "links" && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Label className="text-xs font-semibold">Column Link List</Label>
                              <Button onClick={() => addFooterColumnLink(colIdx)} variant="outline" size="sm" className="h-7 text-xs rounded-lg">
                                <Plus className="w-3.5 h-3.5 mr-1" /> Add Link
                              </Button>
                            </div>
                            
                            <div className="space-y-2">
                              {col.links?.map((link, linkIdx) => (
                                <div key={linkIdx} className="flex gap-2 items-center">
                                  <Input 
                                    value={link.label}
                                    placeholder="Label (e.g. Careers)"
                                    className="text-xs h-8"
                                    onChange={(e) => updateFooterColumnLink(colIdx, linkIdx, "label", e.target.value)}
                                  />
                                  <Input 
                                    value={link.href}
                                    placeholder="URL (e.g. /careers)"
                                    className="text-xs h-8"
                                    onChange={(e) => updateFooterColumnLink(colIdx, linkIdx, "href", e.target.value)}
                                  />
                                  <select 
                                    onChange={(e) => {
                                      if(e.target.value !== "custom") {
                                        updateFooterColumnLink(colIdx, linkIdx, "href", e.target.value);
                                      }
                                    }}
                                    className="bg-card border border-border/40 rounded-lg px-2 h-8 text-[11px] max-w-[100px]"
                                    value={linkTargets.some(t => t.value === link.href) ? link.href : "custom"}
                                  >
                                    <option value="custom">-- Link --</option>
                                    {linkTargets.slice(1).map((t, ti) => (
                                      <option key={ti} value={t.value}>{t.label}</option>
                                    ))}
                                  </select>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => removeFooterColumnLink(colIdx, linkIdx)}
                                    className="h-8 w-8 text-destructive rounded"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {col.type === "contact" && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Contact Info</h5>
                              <div className="space-y-2">
                                <div>
                                  <Label className="text-[10px]">Email Address</Label>
                                  <Input 
                                    value={col.email || ""} 
                                    className="h-8 text-xs"
                                    onChange={(e) => updateFooterColumn(colIdx, { email: e.target.value })} 
                                  />
                                </div>
                                <div>
                                  <Label className="text-[10px]">Phone Number</Label>
                                  <Input 
                                    value={col.phone || ""} 
                                    className="h-8 text-xs"
                                    onChange={(e) => updateFooterColumn(colIdx, { phone: e.target.value })} 
                                  />
                                </div>
                                <div>
                                  <Label className="text-[10px]">Office Address</Label>
                                  <Input 
                                    value={col.address || ""} 
                                    className="h-8 text-xs"
                                    onChange={(e) => updateFooterColumn(colIdx, { address: e.target.value })} 
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <h5 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Social Links</h5>
                              <div className="space-y-2">
                                {col.socials?.map((social, socialIdx) => (
                                  <div key={socialIdx} className="flex gap-2 items-center">
                                    <span className="text-[11px] w-14 font-semibold text-muted-foreground">{social.platform}</span>
                                    <Input 
                                      value={social.href}
                                      placeholder="https://social.com/my-profile"
                                      className="text-xs h-8 flex-1"
                                      onChange={(e) => updateFooterSocialLink(colIdx, socialIdx, "href", e.target.value)}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Bottom Copyright bar and Legal links */}
              <Card className="border border-border/40 bg-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-semibold">Footer Bottom Legal Links</CardTitle>
                    <CardDescription className="text-xs">Manage quick links such as Terms, Privacy, Cookie Settings in the bottom bar.</CardDescription>
                  </div>
                  <Button onClick={addFooterBottomLink} size="sm" variant="outline" className="rounded-xl flex items-center gap-1">
                    <Plus className="w-4 h-4" /> Add Link
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {footerConfig.bottomLinks.map((link, idx) => (
                    <div key={idx} className="flex gap-4 items-center">
                      <Input 
                        value={link.label}
                        placeholder="Link Label (e.g. Privacy Policy)"
                        onChange={(e) => updateFooterBottomLink(idx, "label", e.target.value)}
                      />
                      <Input 
                        value={link.href}
                        placeholder="Link Destination Route (e.g. /privacy)"
                        onChange={(e) => updateFooterBottomLink(idx, "href", e.target.value)}
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeFooterBottomLink(idx)}
                        className="text-destructive hover:bg-destructive/10 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="border-t border-border/40 pt-4 flex justify-end">
                  <Button 
                    onClick={handleSaveFooter} 
                    disabled={isSaving}
                    className="rounded-xl bg-primary text-white shadow shadow-primary/20 flex items-center gap-2"
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Footer Configurations
                  </Button>
                </CardFooter>
              </Card>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
