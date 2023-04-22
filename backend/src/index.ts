import {
  error,
  json,
  missing,
  status,
  ThrowableRouter,
  withContent,
  withParams,
} from "itty-router-extras";
import { v4 as uuidv4 } from "uuid";

import {
  paramsIdSchema,
  todoPostBodySchema,
  todoPutBodySchema,
} from "./schemas";

export const todos = [
  { id: "1", title: "Buy milk", completed: false },
  { id: "2", title: "Buy eggs", completed: false },
  { id: "3", title: "Buy bread", completed: false },
];

export const router = ThrowableRouter({ base: "/api/todos" });

router
  .get("/", () => json(todos))
  .get("/:id", withParams, ({ params }) => {
    const safe = paramsIdSchema.safeParse(params);
    if (!safe.success) {
      return error(400, "Invalid ID");
    }
    const { id } = safe.data;
    const todo = todos.find((t) => t.id === id);

    return todo ? json(todo) : missing("That todo was not found.");
  });

router.post("/", withContent, (request) => {
  if (!request.json) {
    return error(400, "request.json is missing");
  }
  const safe = todoPostBodySchema.safeParse(request.json);
  if (!safe.success) {
    return error(400, "Invalid Todo");
  }
  const { title } = safe.data;
  const id = uuidv4();
  const todo = { id, title, completed: false };
  todos.push(todo);
  return status(201, json(todo));
});

router.put("/:id", withParams, withContent, (request) => {
  if (!request.json) {
    return error(400, "request.json is missing");
  }
  const safeParams = paramsIdSchema.safeParse(request.params);
  if (!safeParams.success) {
    return error(400, "Invalid ID");
  }

  const safe = todoPutBodySchema.safeParse(request.json);
  if (!safe.success) {
    return error(400, "Invalid Todo");
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
});

router.delete("/:id", withParams, ({ params }) => {
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
});

router.all("*", () => missing("Not Found"));

addEventListener("fetch", (event) =>
  event.respondWith(router.handle(event.request))
);
