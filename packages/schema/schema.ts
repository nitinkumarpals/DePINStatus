import { z } from "zod";
export const websiteSchema = z.object({
  url: z.string().min(1, "URL is required"),
});

export const websiteStatusSchema = z.object({
  websiteId: z.string().uuid("Website ID must be a valid UUID"),
});
