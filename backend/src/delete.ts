import { error, status } from "itty-router-extras";

import { deleteTodoFauna } from "./fuanadb";
import { paramsIdSchema } from "./schemas";

export const deleteTodo = async ({ params }: Request & { params: unknown }) => {
  const safe = paramsIdSchema.safeParse(params);
  if (!safe.success) {
    return error(400, "Invalid ID");
  }
  const { id } = safe.data;
  await deleteTodoFauna(id);
  return status(204);
};
