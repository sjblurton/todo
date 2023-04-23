import { error, missing, status } from "itty-router-extras";

import todos from "./data";
import { paramsIdSchema } from "./schemas";

export const deleteTodo = async ({ params }: Request & { params: unknown }) => {
  const safe = paramsIdSchema.safeParse(params);
  if (!safe.success) {
    return error(400, "Invalid ID");
  }
  const { id } = safe.data;
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return missing("That todo was not found.");
  }
  todos.splice(todos.indexOf(todo), 1);
  return status(204);
};
