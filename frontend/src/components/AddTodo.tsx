import {
  CreateTodoInputs,
  createTodoInputSchema,
} from "@/server/schemas/todos";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import React from "react";
import { useForm } from "react-hook-form";

const AddTodo = () => {
  const { handleSubmit, register, reset } = useForm<CreateTodoInputs>({
    resolver: zodResolver(createTodoInputSchema),
  });
  const createTodo = trpc.createTodo.useMutation();
  const { refetch } = trpc.getAllTodos.useQuery();

  const onSubmit = async (data: CreateTodoInputs) => {
    await createTodo.mutateAsync(data);
    reset();
    refetch();
  };
  return (
    <Paper
      style={{ margin: 16, padding: 16 }}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container>
        <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
          <TextField
            placeholder="Add Todo here"
            fullWidth
            {...register("title")}
          />
        </Grid>
        <Grid xs={2} md={1} item>
          <Button fullWidth color="secondary" variant="outlined" type="submit">
            Add
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddTodo;
