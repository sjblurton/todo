import { missing, ThrowableRouter } from "itty-router-extras";

import { deleteTodo } from "./delete";
import { getAllTodos, getTodoById } from "./get";
import { postNewTodo } from "./post";
import { updateTodo } from "./put";

export const app = ThrowableRouter({ base: "/api/todos" });

app
  .get("/", getAllTodos)
  .get("/:id", getTodoById)
  .post("/", postNewTodo)
  .put("/:id", updateTodo)
  .delete("/:id", deleteTodo)
  .all("*", () => missing("Not Found"));

export default app;
