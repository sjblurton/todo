import { trpc } from "@/utils/trpc";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";

import TodoListItem from "./TodoListItem";

const TodoList = () => {
  const { data, isLoading } = trpc.getAllTodos.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {data && data.length > 0 && (
        <Paper style={{ margin: 16 }}>
          <List style={{ overflow: "scroll" }}>
            {data.map((todo) => (
              <TodoListItem {...todo} key={`TodoItem.${todo.id}`} />
            ))}
          </List>
        </Paper>
      )}
    </>
  );
};

export default TodoList;
