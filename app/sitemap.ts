// app/sitemap.ts
import type { MetadataRoute } from "next";

const baseUrl = "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/personal-info`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/personal-info/create-account`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/personal-info/education-info`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/residential-info`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/residential-info/address-info`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    // Avoid using '&' directly — it must be encoded as %26
    // {
    //   url: `${baseUrl}/residential-info/terms%26conditions`,
    //   lastModified: new Date(),
    //   changeFrequency: "daily",
    //   priority: 0.8,
    // },
  ];
}
