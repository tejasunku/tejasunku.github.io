import { defineCollection, z } from "astro:content";
export const collections = {
  rooms: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      exits: z.array(z.string()).default([]),
      variants: z.array(z.object({
        tone: z.enum(["gentle","neutral","sharp"]).default("neutral"),
        line: z.string()
      })).default([])
    })
  })
};