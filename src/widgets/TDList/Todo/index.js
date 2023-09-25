import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import Deletion from "components/Deletion";
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TodoForm from "widgets/TDList/TodoList/ToDoForm";
import { supabase } from "supabaseClient";
import { useAuth } from "hooks/Auth";

function Todo({ color, todo, defaultChecked, noDivider, setDataUpdated }) {
  const { borderWidth } = borders;
  const { info } = colors;
  const [openMenu, setOpenMenu] = useState(null);
  const [open, setOpen] = useState(false);
  const [deletionOpen, setDeletionOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeletionOpen = () => {
    setDeletionOpen(true);
  };

  const handleDeletionClose = () => {
    setDeletionOpen(false);
  };

  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(null);

  const deleteTodo = useCallback(async () => {
    const { error } = await supabase.from("todos").delete().eq("id", todo.id);
    if (error) {
      console.log(error);
    } else {
      setDataUpdated(true);
      handleDeletionClose();
    }
  }, [setDataUpdated, todo.id]);

  const changeStatus = useCallback(async () => {
    const { error } = await supabase
      .from("todos")
      .update({ status: !todo.status })
      .eq("id", todo.id);
    if (error) {
      console.log(error);
    } else {
      setDataUpdated(true);
    }
  }, [setDataUpdated, todo.id, todo.status]);

  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      keepMounted
    >
      <MenuItem onClick={handleClickOpen}>
        Edit
        <EditIcon />
      </MenuItem>
      <MenuItem onClick={handleDeletionOpen}>
        Delete
        <DeleteIcon />
      </MenuItem>
    </Menu>
  );

  return (
    <VuiBox
      component="li"
      width="100%"
      pr={2}
      mb={2}
      borderLeft={`${borderWidth[4]} solid ${colors[color].main}`}
      sx={{ listStyle: "none" }}
    >
      {open && (
        <TodoForm
          open={open}
          onClose={handleClose}
          setDataUpdated={setDataUpdated}
          handleClose={handleClose}
          edit={true}
          data={todo}
          setOpenMenu={setOpenMenu}
        />
      )}
      <VuiBox width="100%" pl={1} ml={2}>
        <VuiBox display="flex" alignItems="top" onClick={changeStatus}>
          <Checkbox
            defaultChecked={false}
            disabled={todo.status}
            style={{ backgroundColor: "#fff" }}
            sx={{
              color: info.main,
              "&.Mui-checked": {
                color: info.main,
              },
            }}
          />
          <VuiBox ml={0.2} lineHeight={1}>
            <VuiTypography variant="button" color="white" fontWeight="medium">
              {todo.title}
            </VuiTypography>
          </VuiBox>
          <VuiBox ml="auto" color="secondary" pr={3} lineHeight={0}>
            <Icon
              fontSize="default"
              sx={{ cursor: "pointer", color: "#fff" }}
              onClick={handleOpenMenu}
            >
              more_horiz
            </Icon>
          </VuiBox>
          {renderMenu()}
        </VuiBox>
        <VuiBox
          display="flex"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mt={2}
          ml={{ xs: 0, md: 3 }}
          pl={0.5}
        >
          <VuiBox ml={{ xs: 0, sm: "auto" }} mb={{ xs: 1, sm: 0 }} lineHeight={1}>
            <VuiTypography display="block" variant="caption" fontWeight="regular" color="white">
              Description
            </VuiTypography>
            <VuiTypography variant="caption" fontWeight="bold" color="white">
              {todo.description}
            </VuiTypography>
          </VuiBox>
          <VuiBox mx={{ xs: 0, sm: "auto" }} lineHeight={1}>
            <VuiTypography display="block" variant="caption" fontWeight="regular" color="white">
              Notes
            </VuiTypography>
            <VuiTypography variant="caption" fontWeight="bold" color="white">
              {todo.notes}
            </VuiTypography>
          </VuiBox>
          <VuiBox lineHeight={1} mb={{ xs: 1, sm: 0 }}>
            <VuiTypography display="block" variant="caption" fontWeight="regular" color="white">
              Date
            </VuiTypography>
            <VuiTypography variant="caption" fontWeight="bold" color="white">
              {todo.date}
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      </VuiBox>
      {noDivider ? null : <Divider light sx={{ marginBottom: 0 }} />}
      <Deletion open={deletionOpen} handleClose={handleDeletionClose} deletion={deleteTodo} />
    </VuiBox>
  );
}

Todo.defaultProps = {
  color: "info",
  noDivider: false,
  defaultChecked: false,
};

Todo.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  defaultChecked: PropTypes.bool,
  noDivider: PropTypes.bool,
};

export default Todo;
