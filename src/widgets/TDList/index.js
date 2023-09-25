import React from "react";
import Grid from "@mui/material/Grid";
import VuiBox from "components/VuiBox";
import TodoList from "widgets/TDList/TodoList";

function ToDoListWidget() {
  return (
    <VuiBox height="100vh" width="100%" display="flex" justifyContent="center" alignItems="start">
      <Grid item xs={12}>
        <VuiBox>
          <TodoList />
        </VuiBox>
      </Grid>
    </VuiBox>
  );
}

export default ToDoListWidget;
