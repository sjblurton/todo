import { trpc } from "@/utils/trpc";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import { Todo } from "schemas";

const TodoListItem = ({ completed, id, title }: Todo) => {
  const deleteTodo = trpc.deleteTodo.useMutation();
  const { refetch } = trpc.getAllTodos.useQuery();
  const updateMutation = trpc.updateTodo.useMutation();

  const deleteTodoByID = async () => {
    await deleteTodo.mutateAsync(id);
    refetch();
  };

  const updateTodo = async () => {
    await updateMutation.mutateAsync({
      id,
      title,
      completed: !completed,
    });
    refetch();
  };

  return (
    <ListItem>
      <Checkbox disableRipple checked={completed} onClick={updateTodo} />
      <ListItemText>{title}</ListItemText>
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete Todo" onClick={deleteTodoByID}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoListItem;
