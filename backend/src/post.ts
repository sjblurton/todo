import { error, json, status } from "itty-router-extras";
import { v4 as uuidv4 } from "uuid";
import { fromZodError } from "zod-validation-error";

import todos from "./data";
import { todoPostBodySchema } from "./schemas";

export const postNewTodo = async (request: Request) => {
  if (!request.json) {
    return error(400, "request.json is missing");
  }
  const body = await request.json();
  const safe = todoPostBodySchema.safeParse(body);
  if (!safe.success) {
    const validationError = fromZodError(safe.error);
    return error(400, validationError);
  }
  const { title } = safe.data;

  console.log("Creating new todo:", title);
  const id = uuidv4();
  const todo = { id, title, completed: false };
  todos.push(todo);
  return status(201, json(todo));
};
