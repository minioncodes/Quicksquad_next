import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.quicksquad.live";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/"], // block backend & private routes
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
