import { getPricingConfig } from "@/app/actions/pricing";
import PricingBuilderClient from "./PricingBuilderClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Manager | Kazzona OS",
};

export default async function PricingManagerPage() {
  const config = await getPricingConfig();
  
  return <PricingBuilderClient initialConfig={config} />;
}
