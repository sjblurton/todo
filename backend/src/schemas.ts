import { z } from "zod";

export const paramsIdSchema = z.object({
  id: z.string(),
});

export const todoPutBodySchema = z.object({
  title: z.string(),
  completed: z.boolean(),
});

export const todoPostBodySchema = todoPutBodySchema.omit({ completed: true });
