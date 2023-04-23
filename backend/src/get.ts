import { error, json, missing } from "itty-router-extras";

import todos from "./data";
import { paramsIdSchema } from "./schemas";

export const getTodoById = async ({
  params,
}: Request & { params: unknown }) => {
  const safe = paramsIdSchema.safeParse(params);
  if (!safe.success) {
    return error(400, "Invalid ID");
  }
  const { id } = safe.data;
  const todo = todos.find((t) => t.id === id);

  return todo ? json(todo) : missing("That todo was not found.");
};

export const getAllTodos = async () => json(todos);
