import { error, json, missing } from "itty-router-extras";

import { getAllTodosFauna, getTodoByIdFauna } from "./fuanadb";
import { paramsIdSchema } from "./schemas";

export const getTodoById = async ({
  params,
}: Request & { params: unknown }) => {
  const safe = paramsIdSchema.safeParse(params);
  if (!safe.success) {
    return error(400, "Invalid ID");
  }
  const { id } = safe.data;

  const todo = await getTodoByIdFauna(id);

  return todo ? json(todo) : missing("That todo was not found.");
};

export const getAllTodos = async () => {
  console.log(process.env.FAUNADB_SECRET);
  const todos = await getAllTodosFauna();
  return json(todos);
};
