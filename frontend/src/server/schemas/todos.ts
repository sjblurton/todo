import { z } from "zod";

export const todoSchema = z.object({
  id: z.string(),
  title: z.string(),
  completed: z.boolean(),
});

export const createTodoInputSchema = todoSchema.pick({ title: true });

export type CreateTodoInputs = z.infer<typeof createTodoInputSchema>;

export type Todo = z.infer<typeof todoSchema>;
