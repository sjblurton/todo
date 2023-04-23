import faunadb from "faunadb";

import { todoSchema } from "./schemas";

const faunaClient = new faunadb.Client({
  secret: FAUNA_SECRET,
});

export default faunaClient;

export const {
  Create,
  Collection,
  Match,
  Index,
  Get,
  Ref,
  Paginate,
  Sum,
  Delete,
  Add,
  Select,
  Let,
  Var,
  Update,
  Map,
  Lambda,
  Query,
  Merge,
} = faunadb.query;

Query(
  Lambda(
    "ref",
    Let(
      { obj: Get(Var("ref")) },
      Merge(Select(["data"], Var("obj")), {
        id: Select(["ref", "id"], Var("obj")),
      })
    )
  )
);

Let(
  { todo: Get(Ref(Collection("todos"), "362810969057919569")) },
  Merge(Select(["data"], Var("todo")), {
    id: Select(["ref", "id"], Var("todo")),
  })
);

export const getAllTodosFauna = async () => {
  const result = await faunaClient
    .query(Map(Paginate(Match(Index("all_todos"))), Lambda("X", Get(Var("X")))))
    .then((res: unknown) => {
      if (!res) return [];
      if (!(typeof res === "object")) return [];
      if (!("data" in res)) return [];
      if (!Array.isArray(res.data)) return [];
      return res.data.map((x) => ({ id: x.ref.id, ...x.data }));
    });
  const data = todoSchema.array().parse(result);
  return data;
};

export const getTodoByIdFauna = async (id: string) => {
  const result = await faunaClient.query(
    Let(
      { todo: Get(Ref(Collection("todos"), id)) },
      Merge(Select(["data"], Var("todo")), {
        id: Select(["ref", "id"], Var("todo")),
      })
    )
  );
  const data = todoSchema.parse(result);
  return data;
};

export const createTodoFauna = async (title: string) =>
  await faunaClient.query(
    Create(Collection("todos"), {
      data: { title, completed: false },
    })
  );

export const updateTodoFauna = async ({
  completed,
  title,
  id,
}: {
  id: string;
  title: string;
  completed: boolean;
}) =>
  await faunaClient.query(
    Update(Ref(Collection("todos"), id), {
      data: { title, completed },
    })
  );

export const deleteTodoFauna = async (id: string) =>
  await faunaClient.query(Delete(Ref(Collection("todos"), id)));
