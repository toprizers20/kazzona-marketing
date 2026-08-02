"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Code, BarChart, LineChart, Palette, Megaphone, Bot } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Website Development",
    description: "Custom enterprise Next.js and Headless CMS architectures built for speed and conversion.",
    icon: <Code className="w-8 h-8 text-primary" />,
    href: "/services/web-development"
  },
  {
    title: "Programmatic SEO",
    description: "Scalable search engine optimization targeting thousands of high-intent keywords.",
    icon: <BarChart className="w-8 h-8 text-primary" />,
    href: "/services/seo"
  },
  {
    title: "Performance Marketing",
    description: "Data-driven ad campaigns across Meta, Google, and LinkedIn optimized for ROI.",
    icon: <LineChart className="w-8 h-8 text-primary" />,
    href: "/services/performance-marketing"
  },
  {
    title: "Branding & Creative",
    description: "Premium brand identities, UI/UX design, and motion graphics that demand attention.",
    icon: <Palette className="w-8 h-8 text-primary" />,
    href: "/services/branding"
  },
  {
    title: "Lead Generation",
    description: "High-converting funnel systems designed to capture and nurture enterprise leads.",
    icon: <Megaphone className="w-8 h-8 text-primary" />,
    href: "/services/lead-generation"
  },
  {
    title: "AI & Automations",
    description: "Custom automation workflows integrating AI to streamline your agency operations.",
    icon: <Bot className="w-8 h-8 text-primary" />,
    href: "/services/automation"
  }
];

export function ServicesEcosystem() {
  return (
    <section className="py-24 md:py-32 relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Our Core <span className="text-primary">Ecosystem</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              We provide end-to-end digital growth solutions tailored for enterprise brands.
            </p>
          </div>
          <Link 
            href="/services" 
            className="group flex items-center gap-2 text-primary font-medium hover:text-primary/80 transition-colors"
          >
            View all services 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group h-full bg-card hover:bg-secondary/50 border-border/50 hover:border-primary/50 transition-all duration-300 cursor-pointer">
                <CardHeader>
                  <div className="mb-4 p-3 bg-secondary rounded-lg w-fit group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <CardTitle className="font-heading text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-6">
                    {service.description}
                  </CardDescription>
                  <Link 
                    href={service.href}
                    className="inline-flex items-center text-sm font-semibold text-foreground group-hover:text-primary transition-colors"
                  >
                    Learn more <ArrowRight className="ml-2 w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
