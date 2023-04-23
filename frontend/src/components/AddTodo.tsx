import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import React from "react";

const AddTodo = () => {
  return (
    <Paper style={{ margin: 16, padding: 16 }}>
      <Grid container>
        <Grid xs={10} md={11} item style={{ paddingRight: 16 }}>
          <TextField placeholder="Add Todo here" fullWidth />
        </Grid>
        <Grid xs={2} md={1} item>
          <Button fullWidth color="secondary" variant="outlined">
            Add
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AddTodo;
