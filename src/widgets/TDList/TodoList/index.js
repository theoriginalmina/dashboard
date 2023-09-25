
import * as React from "react";
import { useState, useEffect, useCallback } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Vision UI Dasboard PRO Material components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";

// General page components
import Todo from "widgets/TDList/Todo";
import TodoForm from "widgets/TDList/TodoList/ToDoForm";

import { supabase } from "supabaseClient";
import { useAuth } from "hooks/Auth";

import dayjs from "dayjs";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);

  const { user } = useAuth();
  const userId = user?.id;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getTodos = useCallback(async () => {
    const { data } = await supabase.from("todos").select().eq("user_id", userId);
    setTodos(data);
    setDataUpdated(false);
  }, [userId]);

  const crntMonth = dayjs(new Date()).format("MMMM");
  const crntYear = dayjs(new Date()).format("YYYY");

  useEffect(() => {
    getTodos();
  }, [dataUpdated, getTodos]);

  return (
    <Card>
      <VuiBox display="flex" justifyContent="space-between" alignItems="center">
        <VuiTypography variant="lg" fontWeight="bold" color="white">
          To Do List
        </VuiTypography>
        <VuiButton color="primary" onClick={handleClickOpen}>
          <Icon sx={{ fontWeight: "bold" }}>add</Icon>
        </VuiButton>
        {open && (
          <TodoForm
            open={open}
            onClose={handleClose}
            setDataUpdated={setDataUpdated}
            handleClose={handleClose}
          />
        )}
        <VuiTypography variant="button" fontWeight="regular" color="text">
          {crntMonth + " " + crntYear}
        </VuiTypography>
      </VuiBox>
      <Divider />
      <VuiBox>
        <VuiBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} setDataUpdated={setDataUpdated} />
          ))}
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default TodoList;
