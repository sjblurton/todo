import List from "@mui/material/List";
import Paper from "@mui/material/Paper";

import TodoListItem from "./TodoListItem";

const TodoList = () => {
  const items = [
    {
      id: "1",
      text: "Todo 1",
      completed: false,
    },
  ];

  return (
    <>
      {items.length > 0 && (
        <Paper style={{ margin: 16 }}>
          <List style={{ overflow: "scroll" }}>
            {items.map((todo) => (
              <TodoListItem {...todo} key={`TodoItem.${todo.id}`} />
            ))}
          </List>
        </Paper>
      )}
    </>
  );
};

export default TodoList;
