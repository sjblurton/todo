import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";

const TodoListItem = () => {
  return (
    <ListItem>
      <Checkbox disableRipple />
      <ListItemText />
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete Todo">
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoListItem;
