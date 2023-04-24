import { z } from "zod";

export const paramsIdSchema = z.object({
  id: z.string(),
});

export const todoSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
});

export const todoPutBodySchema = todoSchema.pick({
  title: true,
  completed: true,
});

export const todoPostBodySchema = todoPutBodySchema.omit({ completed: true });

export const createTodoInputSchema = todoSchema.pick({ title: true });

export type CreateTodoInputs = z.infer<typeof createTodoInputSchema>;

export type Todo = z.infer<typeof todoSchema>;
