"use client";

import { useState } from "react";
import { PricingConfig, PricingSection, PricingCategory, PricingPlan, PricingFeature } from "@/lib/pricing-defaults";
import { savePricingConfig } from "@/app/actions/pricing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Trash2, GripVertical, Check, Loader2, Save, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function PricingBuilderClient({ initialConfig }: { initialConfig: PricingConfig }) {
  const [config, setConfig] = useState<PricingConfig>(initialConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  const triggerToast = (text: string, type: "success" | "error" = "success") => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  // Basic Settings
  const updateBasic = (field: keyof PricingConfig, value: string) => {
    setConfig({ ...config, [field]: value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    const result = await savePricingConfig(config);
    setIsSaving(false);
    
    if (result.success) {
      triggerToast("Pricing plans have been updated successfully.");
    } else {
      triggerToast(result.error || "Failed to save pricing configuration.", "error");
    }
  };

  // Sections
  const addSection = () => {
    setConfig({
      ...config,
      sections: [...config.sections, { id: `sec-${Date.now()}`, title: "New Section", categories: [] }]
    });
  };

  const updateSection = (sIdx: number, title: string) => {
    const newSections = [...config.sections];
    newSections[sIdx].title = title;
    setConfig({ ...config, sections: newSections });
  };

  const removeSection = (sIdx: number) => {
    const newSections = [...config.sections];
    newSections.splice(sIdx, 1);
    setConfig({ ...config, sections: newSections });
  };

  // Categories
  const addCategory = (sIdx: number) => {
    const newSections = [...config.sections];
    newSections[sIdx].categories.push({
      id: `cat-${Date.now()}`,
      title: "New Category",
      subtitle: "",
      plans: []
    });
    setConfig({ ...config, sections: newSections });
  };

  const updateCategory = (sIdx: number, cIdx: number, field: keyof PricingCategory, value: string) => {
    const newSections = [...config.sections];
    newSections[sIdx].categories[cIdx] = { ...newSections[sIdx].categories[cIdx], [field]: value };
    setConfig({ ...config, sections: newSections });
  };

  const removeCategory = (sIdx: number, cIdx: number) => {
    const newSections = [...config.sections];
    newSections[sIdx].categories.splice(cIdx, 1);
    setConfig({ ...config, sections: newSections });
  };

  // Plans
  const addPlan = (sIdx: number, cIdx: number) => {
    const newSections = [...config.sections];
    newSections[sIdx].categories[cIdx].plans.push({
      name: "New Plan",
      price: "₹0",
      features: [{ text: "Feature 1" }],
      popular: false
    });
    setConfig({ ...config, sections: newSections });
  };

  const updatePlan = (sIdx: number, cIdx: number, pIdx: number, field: keyof PricingPlan, value: any) => {
    const newSections = [...config.sections];
    newSections[sIdx].categories[cIdx].plans[pIdx] = { ...newSections[sIdx].categories[cIdx].plans[pIdx], [field]: value };
    setConfig({ ...config, sections: newSections });
  };

  const removePlan = (sIdx: number, cIdx: number, pIdx: number) => {
    const newSections = [...config.sections];
    newSections[sIdx].categories[cIdx].plans.splice(pIdx, 1);
    setConfig({ ...config, sections: newSections });
  };

  // Features
  const addFeature = (sIdx: number, cIdx: number, pIdx: number) => {
    const newSections = [...config.sections];
    newSections[sIdx].categories[cIdx].plans[pIdx].features.push({ text: "" });
    setConfig({ ...config, sections: newSections });
  };

  const updateFeature = (sIdx: number, cIdx: number, pIdx: number, fIdx: number, text: string) => {
    const newSections = [...config.sections];
    newSections[sIdx].categories[cIdx].plans[pIdx].features[fIdx].text = text;
    setConfig({ ...config, sections: newSections });
  };

  const removeFeature = (sIdx: number, cIdx: number, pIdx: number, fIdx: number) => {
    const newSections = [...config.sections];
    newSections[sIdx].categories[cIdx].plans[pIdx].features.splice(fIdx, 1);
    setConfig({ ...config, sections: newSections });
  };

  return (
    <div className="flex flex-col gap-8 pb-20 relative">
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

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Pricing Builder</h2>
          <p className="text-muted-foreground">Manage your packages, features, and pricing sections.</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="w-full md:w-auto rounded-xl shadow-lg shadow-primary/20 bg-gradient-to-r from-primary to-orange-600 hover:shadow-primary/40 transition-all font-bold text-white px-8">
          {isSaving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          {isSaving ? "Saving..." : "Save Pricing Configuration"}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Global Settings */}
        <Card className="bg-card/50 border-border/50 rounded-3xl overflow-hidden backdrop-blur-xl">
          <CardHeader className="bg-secondary/30 border-b border-border/50 p-6">
            <CardTitle>Global Settings</CardTitle>
            <CardDescription>Banner text and main call-to-action details</CardDescription>
          </CardHeader>
          <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 md:col-span-2">
              <label className="text-sm font-semibold">Banner Text</label>
              <Input 
                value={config.bannerText} 
                onChange={e => updateBasic("bannerText", e.target.value)} 
                className="bg-background rounded-xl border-border/60"
                placeholder="e.g. Sirf ₹1,000 advance se kaam shuru..."
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold">CTA Button Text</label>
              <Input 
                value={config.ctaText} 
                onChange={e => updateBasic("ctaText", e.target.value)} 
                className="bg-background rounded-xl border-border/60"
              />
            </div>
            <div className="space-y-3">
              <label className="text-sm font-semibold">CTA Button Link</label>
              <Input 
                value={config.ctaHref} 
                onChange={e => updateBasic("ctaHref", e.target.value)} 
                className="bg-background rounded-xl border-border/60"
              />
            </div>
          </CardContent>
        </Card>

        {/* Sections */}
        {config.sections.map((section, sIdx) => (
          <Card key={section.id} className="bg-card/50 border-border/50 rounded-3xl overflow-hidden backdrop-blur-xl">
            <CardHeader className="bg-primary/5 border-b border-border/50 p-6 flex flex-row items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
                <Input 
                  value={section.title} 
                  onChange={e => updateSection(sIdx, e.target.value)} 
                  className="bg-background max-w-sm rounded-xl border-border/60 font-bold"
                  placeholder="Section Title (e.g. Website Pricing)"
                />
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeSection(sIdx)} className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl">
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              
              {/* Categories inside Section */}
              {section.categories.map((category, cIdx) => (
                <div key={category.id} className="border border-border/60 rounded-2xl p-6 bg-secondary/20 relative">
                  <div className="absolute top-4 right-4">
                    <Button variant="ghost" size="icon" onClick={() => removeCategory(sIdx, cIdx)} className="text-destructive hover:bg-destructive/10 rounded-xl w-8 h-8">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 max-w-3xl pr-12">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tab Title</label>
                      <Input 
                        value={category.title} 
                        onChange={e => updateCategory(sIdx, cIdx, "title", e.target.value)} 
                        className="bg-background rounded-lg border-border/60 font-semibold"
                        placeholder="e.g. CMS Website"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subtitle</label>
                      <Input 
                        value={category.subtitle} 
                        onChange={e => updateCategory(sIdx, cIdx, "subtitle", e.target.value)} 
                        className="bg-background rounded-lg border-border/60"
                      />
                    </div>
                  </div>

                  {/* Plans inside Category */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm">Plans</h4>
                      <Button variant="outline" size="sm" onClick={() => addPlan(sIdx, cIdx)} className="h-8 rounded-lg text-xs">
                        <Plus className="w-3 h-3 mr-1" /> Add Plan
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                      {category.plans.map((plan, pIdx) => (
                        <div key={pIdx} className={`border rounded-xl p-4 bg-card ${plan.popular ? 'border-primary/50 ring-1 ring-primary/20' : 'border-border/60'}`}>
                          <div className="flex justify-between mb-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={plan.popular} 
                                onChange={e => updatePlan(sIdx, cIdx, pIdx, "popular", e.target.checked)}
                                className="rounded text-primary focus:ring-primary w-4 h-4"
                              />
                              <span className="text-xs font-semibold text-primary">Popular</span>
                            </label>
                            <Button variant="ghost" size="icon" onClick={() => removePlan(sIdx, cIdx, pIdx)} className="h-6 w-6 text-destructive hover:bg-destructive/10 rounded-md">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                          
                          <div className="space-y-3 mb-4">
                            <Input 
                              value={plan.name} 
                              onChange={e => updatePlan(sIdx, cIdx, pIdx, "name", e.target.value)} 
                              className="h-8 text-sm font-bold bg-background/50 rounded-lg"
                              placeholder="Plan Name"
                            />
                            <Input 
                              value={plan.price} 
                              onChange={e => updatePlan(sIdx, cIdx, pIdx, "price", e.target.value)} 
                              className="h-8 text-sm font-bold text-primary bg-background/50 rounded-lg"
                              placeholder="Price (e.g. ₹6,999)"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-muted-foreground">Features</span>
                              <Button variant="ghost" size="icon" onClick={() => addFeature(sIdx, cIdx, pIdx)} className="h-5 w-5 rounded">
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                              {plan.features.map((feature, fIdx) => (
                                <div key={fIdx} className="flex items-center gap-2">
                                  <Check className="w-3 h-3 text-primary shrink-0" />
                                  <Input 
                                    value={feature.text} 
                                    onChange={e => updateFeature(sIdx, cIdx, pIdx, fIdx, e.target.value)} 
                                    className="h-7 text-xs bg-background/50 rounded-md px-2"
                                    placeholder="Feature detail"
                                  />
                                  <Button variant="ghost" size="icon" onClick={() => removeFeature(sIdx, cIdx, pIdx, fIdx)} className="h-6 w-6 shrink-0 text-muted-foreground hover:text-destructive rounded-md">
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <Button variant="outline" onClick={() => addCategory(sIdx)} className="w-full rounded-xl border-dashed py-6 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors">
                <Plus className="w-4 h-4 mr-2" /> Add Category Tab
              </Button>

            </CardContent>
          </Card>
        ))}

        <Button variant="outline" onClick={addSection} className="w-full rounded-3xl border-dashed border-2 py-12 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-colors font-semibold text-base">
          <Plus className="w-5 h-5 mr-2" /> Add New Pricing Section
        </Button>
      </div>
    </div>
  );
}
