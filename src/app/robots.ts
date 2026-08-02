import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://kazzona.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/api/", "/search?"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
