"use client";
import React, { useState, useEffect } from "react";
import { MessageCircle, X, Send, Check, Search } from "lucide-react";

const services = [
  { group: "Website Development", items: ["Web - Starter", "Web - Recommended", "Web - Shopify / E-Commerce"] },
  { group: "SEO Optimization", items: ["SEO - Local SEO", "SEO - National SEO", "SEO - Ecommerce SEO"] },
  { group: "Advertising", items: ["Ads - Meta Ads", "Ads - Google Ads", "Ads - Combined Package"] },
  { group: "Other Services", items: ["Email Marketing", "Graphic Designing", "Programmatic SEO", "Full Service Retainer"] },
];

export default function WhatsAppButton() {
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<"name" | "service">("name");

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (show) {
      const formTimer = setTimeout(() => setShowForm(true), 3000);
      return () => clearTimeout(formTimer);
    }
  }, [show]);

  const handleClose = () => {
    setShowForm(false);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setSelectedService("");
      setStep("name");
    }, 300);
  };

  const handleSend = () => {
    if (!name.trim() || !selectedService) return;
    const msg = `Hi, I'm ${name.trim()}.\n\nI'm interested in: *${selectedService}*\n\nPlease share the details.`;
    const url = `https://wa.me/919999568910?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Form Popup - Centered on screen */}
      <div
        className={`fixed inset-0 z-[200] flex items-center justify-center p-4 transition-all duration-300 ${
          showForm ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />
        <div
          className={`relative w-full max-w-[340px] bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.18)] border border-gray-100 overflow-hidden transition-all duration-300 ${
            showForm ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
          }`}
        >
        {/* Header */}
        <div className="bg-[#128C7E] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </div>
            <div>
              <div className="text-white text-sm font-bold">Get a Free Quote</div>
              <div className="text-white/70 text-[11px]">Quick reply within 5 min</div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        {!submitted ? (
          <>
            {step === "name" ? (
              <div className="p-4">
                <label className="text-xs font-bold text-gray-500 mb-1.5 block">Your Name</label>
                <input
                  type="text"
                  autoFocus
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && name.trim()) setStep("service"); }}
                  className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#128C7E]/30 focus:border-[#128C7E] transition-all"
                />
                <button
                  onClick={() => { if (name.trim()) setStep("service"); }}
                  disabled={!name.trim()}
                  className="w-full mt-3 py-3 rounded-xl bg-[#128C7E] hover:bg-[#0e7a6e] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next <span className="text-lg">→</span>
                </button>
              </div>
            ) : (
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <label className="text-xs font-bold text-gray-500 block">Select Service</label>
                    <p className="text-[11px] text-gray-400 mt-0.5">Choose what you need help with</p>
                  </div>
                  <button
                    onClick={() => setStep("name")}
                    className="text-[11px] font-semibold text-[#128C7E] hover:underline"
                  >
                    Change Name
                  </button>
                </div>

                <div className="max-h-[300px] overflow-y-auto space-y-3 pr-1 -mr-1">
                  {services.map((cat) => (
                    <div key={cat.group}>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5 pl-0.5">
                        {cat.group}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.items.map((item) => {
                          const isSelected = selectedService === item;
                          return (
                            <button
                              key={item}
                              onClick={() => setSelectedService(item)}
                              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
                                isSelected
                                  ? "bg-[#128C7E] text-white border-[#128C7E] shadow-md shadow-[#128C7E]/20"
                                  : "bg-gray-50 text-gray-600 border-gray-200 hover:border-[#128C7E]/50 hover:bg-[#128C7E]/5"
                              }`}
                            >
                              <span className="flex items-center gap-1.5">
                                {isSelected && <Check className="w-3 h-3" />}
                                {item.replace(/^(Web|SEO|Ads) - /, "")}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleSend}
                  disabled={!selectedService}
                  className="w-full mt-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BD5C] text-white text-sm font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/30"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Send on WhatsApp
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-3">
              <Check className="w-7 h-7 text-[#25D366]" />
            </div>
            <p className="text-sm font-bold text-gray-900">Sent!</p>
            <p className="text-xs text-gray-500 mt-1">We&apos;ll reply on WhatsApp soon.</p>
          </div>
        )}
        </div>
      </div>

      {/* Button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="relative w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-pulse opacity-10" />
        <MessageCircle className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
}
