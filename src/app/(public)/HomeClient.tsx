"use client";

import VideoTestimonials from "@/components/VideoTestimonials";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeSocialProof } from "@/components/home/HomeSocialProof";
import { HomeServices } from "@/components/home/HomeServices";
import { HomeProof } from "@/components/home/HomeProof";
import { HomeProcess } from "@/components/home/HomeProcess";

export default function HomeClient() {
  return (
    <div className="flex flex-col">
      <HomeHero />
      <HomeSocialProof />
      <HomeServices />
      <HomeProof />
      <VideoTestimonials />
      <HomeProcess />
    </div>
  );
}
