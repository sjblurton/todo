import { error, status } from "itty-router-extras";
import { fromZodError } from "zod-validation-error";

import { createTodoFauna } from "./fuanadb";
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
  await createTodoFauna(title);

  return status(201);
};
