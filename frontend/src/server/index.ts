import axios from "axios";
import { z } from "zod";
import { createTodoInputSchema, todoSchema } from "zod-schemas";

import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  getAllTodos: publicProcedure.query(async () => {
    const response = await axios.get("http://0.0.0.0:8787/api/todos/");
    if (response.status !== 200) {
      throw new Error("Failed to fetch todos");
    }
    const todos = todoSchema.array().parse(response.data);
    return todos;
  }),
  getTodo: publicProcedure.input(z.string()).query(async ({ input }) => {
    const response = await axios.get(`http://0.0.0.0:8787/api/todos/${input}`);
    if (response.status !== 200) {
      throw new Error("Failed to fetch todo");
    }
    const todo = todoSchema.parse(response.data);
    return todo;
  }),
  deleteTodo: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    const response = await axios.delete(
      `http://0.0.0.0:8787/api/todos/${input}`
    );
    if (response.status !== 204) {
      throw new Error("Failed to delete todo");
    }
    return `Deleted todo with ID ${input}`;
  }),
  createTodo: publicProcedure
    .input(createTodoInputSchema)
    .mutation(async ({ input }) => {
      const response = await axios.post("http://0.0.0.0:8787/api/todos", input);
      if (response.status !== 201) {
        throw new Error("Failed to create todo");
      }
      return;
    }),
  updateTodo: publicProcedure.input(todoSchema).mutation(async ({ input }) => {
    const response = await axios.put(
      `http://0.0.0.0:8787/api/todos/${input.id}`,
      input
    );

    if (response.status !== 200) {
      throw new Error("Failed to update todo");
    }
    return;
  }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
