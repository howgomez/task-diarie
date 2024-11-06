import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  visibility: z.enum(["public", "private"]).optional(),
  date: z.date().optional(),
  image: z.string().optional()
});