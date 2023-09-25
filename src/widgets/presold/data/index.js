

import React, { useCallback, useEffect, useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";
import Deletion from "components/Deletion";
import EditForm from "layouts/dashboard/daily/components/Projects/EditForm";
import { supabase } from "supabaseClient";
import { useAuth } from "hooks/Auth";

export default function Data({ dataUpdated, setDataUpdated }) {
  const [presales, setPresales] = useState([]);
  const [openDeletion, setOpenDeletion] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { user } = useAuth();
  const userId = user?.id;

  const getPresales = useCallback(async () => {
    try {
      const { data, error } = await supabase.from("presales").select().eq("user_id", userId);

      if (error) {
        console.error(error);
      } else {
        setPresales(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [userId]);

  const handleOpenDeletion = () => {
    setOpenDeletion(true);
  };

  const handleClose = () => {
    setOpenDeletion(false);
  };

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const deletePresales = useCallback(
    async (id) => {
      try {
        const { error } = await supabase.from("presales").delete().eq("id", id);

        if (error) {
          console.error(error);
        } else {
          setOpenDeletion(false);
          setDataUpdated(true);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [setDataUpdated]
  );

  const avatars = [avatar1, avatar2, avatar3, avatar4];

  useEffect(() => {
    getPresales();
    setDataUpdated(false);
  }, [getPresales, dataUpdated]);

  const columns = [
    { name: "customer", align: "left" },
    { name: "vehicles", align: "left" },
    { name: "notes", align: "center" },
    { name: "date", align: "center" },
    { name: "delete", align: "center" },
  ];

  const tableRows = presales.map((presale) => ({
    customer: (
      <VuiBox display="flex" alignItems="center">
        <VuiTypography color="white" variant="button" fontWeight="medium">
          {presale.customer}
        </VuiTypography>
      </VuiBox>
    ),
    vehicles: (
      <VuiBox display="flex" alignItems="center">
        <VuiTypography color="white" variant="button" fontWeight="medium">
          {presale.vehicle}
        </VuiTypography>
      </VuiBox>
    ),
    notes: (
      <VuiTypography variant="body2" color="white">
        {presale.notes}
      </VuiTypography>
    ),
    date: (
      <VuiTypography variant="body2" color="white">
        {presale.date}
      </VuiTypography>
    ),
    delete: (
      <>
        <IconButton aria-label="delete" size="small" color="error" onClick={handleOpenDeletion}>
          <DeleteIcon />
        </IconButton>
        <Deletion
          open={openDeletion}
          handleClose={handleClose}
          deletion={() => deletePresales(presale.id)}
        />
      </>
    ),
  }));

  return {
    columns,
    rows: tableRows,
    presales,
  };
}
