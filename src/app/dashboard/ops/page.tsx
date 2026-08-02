import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import OpsDashboardClient from "./OpsDashboardClient";

export const metadata: Metadata = {
  title: "Ops Dashboard | Kazzona OS",
};

export default async function OpsPage() {
  const session = await getSession();
  if (!session) redirect("/sign-in");

  return <OpsDashboardClient />;
}
