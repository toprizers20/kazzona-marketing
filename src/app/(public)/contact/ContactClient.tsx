"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { submitLead } from "@/app/actions/crm";
import { CheckCircle2, MessageSquare, Rocket, Shield, User, Mail, Building2, Grid3X3, Pencil, Lock, ArrowRight } from "lucide-react";

export default function ContactClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const toggleService = (srv: string) => {
    setServices(prev => prev.includes(srv) ? prev.filter(s => s !== srv) : [...prev, srv]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (services.length === 0) {
      setError("Please select at least one service.");
      return;
    }
    
    setIsSubmitting(true);
    setError("");

    try {
      const result = await submitLead({ name, email, company, service: services.join(", "), message });
      if (result.error) {
        setError(result.error);
      } else {
        setIsSuccess(true);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFAF5] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px]">
        <svg viewBox="0 0 600 600" className="w-full h-full opacity-[0.07]">
          <circle cx="300" cy="300" r="280" fill="none" stroke="#F97316" strokeWidth="1" />
          <circle cx="300" cy="300" r="220" fill="none" stroke="#F97316" strokeWidth="1" />
          <circle cx="300" cy="300" r="160" fill="none" stroke="#F97316" strokeWidth="1" />
        </svg>
      </div>

      <div className="container mx-auto px-6 py-24 lg:py-32 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left Side */}
          <div className="space-y-8 lg:sticky lg:top-32">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold mb-6 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#F97316]" />
                Let&apos;s Connect
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-[1.1] mb-4">
                Contact<br />
                <span className="text-[#F97316]">Kazzona Marketing</span>
              </h1>
              <div className="w-16 h-1 rounded-full bg-[#F97316] mb-6" />
              <p className="text-lg text-gray-500 leading-relaxed max-w-md">
                Ready to scale? Let&apos;s discuss your enterprise growth strategy.
              </p>
            </div>

            {/* Feature points */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F97316]/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6 text-[#F97316]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Quick Response</h3>
                  <p className="text-sm text-gray-500">We reply within 24 hours</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F97316]/10 flex items-center justify-center shrink-0">
                  <Rocket className="w-6 h-6 text-[#F97316]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Growth Focused</h3>
                  <p className="text-sm text-gray-500">Strategies that drive real results</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F97316]/10 flex items-center justify-center shrink-0">
                  <Shield className="w-6 h-6 text-[#F97316]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Trusted by Businesses</h3>
                  <p className="text-sm text-gray-500">200+ clients across India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form Card */}
          <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.06)] border border-gray-100">
            {!isSuccess ? (
              <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-bold text-gray-700">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input 
                        id="name"
                        placeholder="John Doe" 
                        className="pl-10 bg-gray-50 border-gray-200 h-12 rounded-xl focus:border-[#F97316] focus:ring-[#F97316]/20" 
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-bold text-gray-700">Work Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input 
                        id="email"
                        type="email" 
                        placeholder="john@company.com" 
                        className="pl-10 bg-gray-50 border-gray-200 h-12 rounded-xl focus:border-[#F97316] focus:ring-[#F97316]/20" 
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="company" className="text-sm font-bold text-gray-700">Company Name</label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input 
                        id="company"
                        placeholder="Acme Corp" 
                        className="pl-10 bg-gray-50 border-gray-200 h-12 rounded-xl focus:border-[#F97316] focus:ring-[#F97316]/20" 
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 relative">
                    <label htmlFor="service" className="text-sm font-bold text-gray-700">Services Requested *</label>
                    <div 
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex min-h-12 w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2 text-sm cursor-pointer hover:border-gray-300 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Grid3X3 className="w-4 h-4 text-gray-400" />
                        <span className={services.length > 0 ? "text-gray-700" : "text-gray-400"}>
                          {services.length > 0 ? `${services.length} selected` : "Select services..."}
                        </span>
                      </div>
                      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className={`transition-transform text-gray-400 ${dropdownOpen ? 'rotate-180' : ''}`}><path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    </div>
                    
                    {dropdownOpen && (
                      <div className="absolute top-[68px] left-0 w-full z-10 bg-white border border-gray-200 rounded-2xl shadow-xl max-h-64 overflow-y-auto p-2">
                        {[
                          { group: "Website Development", prefix: "Web", options: ["Starter", "Recommended", "Shopify / E-Commerce"] },
                          { group: "SEO Optimization", prefix: "SEO", options: ["Local SEO", "National SEO", "Ecommerce SEO"] },
                          { group: "Advertising", prefix: "Ads", options: ["Meta Ads", "Google Ads", "Combined Package"] },
                          { group: "Other Services", prefix: "", options: ["Email Marketing", "Graphic Designing", "Programmatic SEO", "Full Service Retainer"] }
                        ].map(category => (
                          <div key={category.group} className="mb-3 last:mb-0">
                            <div className="px-3 py-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-wider bg-gray-50 rounded-lg mb-1">
                              {category.group}
                            </div>
                            <div className="flex flex-col gap-0.5">
                              {category.options.map(opt => {
                                const val = category.prefix ? `${category.prefix} - ${opt}` : opt;
                                const isSelected = services.includes(val);
                                return (
                                  <label key={val} className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-orange-50 cursor-pointer transition-colors">
                                    <input 
                                      type="checkbox" 
                                      className="w-4 h-4 rounded border-gray-300 text-[#F97316] focus:ring-[#F97316]/25 cursor-pointer accent-[#F97316]"
                                      checked={isSelected}
                                      onChange={() => toggleService(val)}
                                    />
                                    <span className="text-sm text-gray-700">{opt}</span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-bold text-gray-700">How can we help? *</label>
                  <div className="relative">
                    <Pencil className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                    <Textarea 
                      id="message"
                      rows={4} 
                      placeholder="Tell us about your project..." 
                      className="pl-10 bg-gray-50 border-gray-200 rounded-xl focus:border-[#F97316] focus:ring-[#F97316]/20 resize-none" 
                      required
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                    />
                  </div>
                </div>

                {error && <p className="text-sm font-medium text-red-500">{error}</p>}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#DC2626] text-white font-bold py-4 rounded-2xl text-base shadow-lg shadow-[#F97316]/25 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Sending..." : "Send Message"} <ArrowRight className="w-5 h-5" />
                </button>

                <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-1">
                  <Lock className="w-3.5 h-3.5" />
                  Your information is secure and confidential.
                </div>
              </form>
            ) : (
              <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-500 mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Inquiry Received</h2>
                <p className="text-gray-500 max-w-sm text-lg">
                  Thank you for reaching out, {name.split(" ")[0]}. Our team will review your project and contact you shortly.
                </p>
                <button onClick={() => setIsSuccess(false)} className="mt-8 px-6 py-3 rounded-xl border border-gray-200 font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
