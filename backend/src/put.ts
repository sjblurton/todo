import { error, json, missing, status } from "itty-router-extras";
import { fromZodError } from "zod-validation-error";

import todos from "./data";
import { paramsIdSchema, todoPutBodySchema } from "./schemas";

export const updateTodo = async (request: Request & { params: unknown }) => {
  if (!request.json) {
    return error(400, "request.json is missing");
  }
  const safeParams = paramsIdSchema.safeParse(request.params);
  if (!safeParams.success) {
    return error(400, "Invalid ID");
  }
  const body = await request.json();
  const safe = todoPutBodySchema.safeParse(body);
  if (!safe.success) {
    const validationError = fromZodError(safe.error);
    return error(400, validationError);
  }
  const { title, completed } = safe.data;
  const { id } = safeParams.data;
  const todo = todos.find((t) => t.id === id);
  if (!todo) {
    return missing("That todo was not found.");
  }
  todo.title = title;
  todo.completed = completed;
  return status(200, json(todo));
};
