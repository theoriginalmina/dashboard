import { useState, useCallback, useEffect, useMemo } from "react";

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import VuiProgress from "components/VuiProgress";

// Images
import AdobeXD from "examples/Icons/AdobeXD";
import Atlassian from "examples/Icons/Atlassian";
import Slack from "examples/Icons/Slack";
import Spotify from "examples/Icons/Spotify";
import Jira from "examples/Icons/Jira";
import Invision from "examples/Icons/Invision";
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";

import Deletion from "components/Deletion";
import EditForm from "layouts/dashboard/daily/components/Projects/EditForm";

import { supabase } from "supabaseClient";
import { useAuth } from "hooks/Auth";

export default function Data(dataUpdated, setDataUpdated) {
  const [leads, setLeads] = useState([]);
  const [openDeletion, setOpenDeletion] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { user } = useAuth();
  const userId = user?.id;

  const getLeads = useCallback(async () => {
    const { data, error } = await supabase.from("leads").select().eq("user_id", userId);

    if (error) {
      console.log(error);
    } else {
      setLeads(data);
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

  const deleteLead = useCallback(
    async (id) => {
      const { error } = await supabase.from("leads").delete().eq("id", id);

      if (error) {
        console.log(error);
      } else {
        setOpenDeletion(false);
        setDataUpdated(true);
      }
    },
    [setDataUpdated]
  );

  const avatars = [avatar1, avatar2, avatar3, avatar4];

  useEffect(() => {
    getLeads();
    setDataUpdated(false);
  }, [getLeads, dataUpdated]);

  return {
    columns: [
      { name: "vehicles", align: "left" },
      { name: "customers", align: "left" },
      { name: "price", align: "center" },
      { name: "heat_index", align: "center" },
      { name: "delete", align: "center" },
    ],

    rows: leads.map((lead) => {
      return {
        vehicles: (
          <VuiBox display="flex" alignItems="center">
            <VuiTypography color="white" variant="button" fontWeight="medium">
              {lead.vehicle}
            </VuiTypography>
          </VuiBox>
        ),
        customers: (
          <VuiBox display="flex" justifyContent="space-between" py={1}>
            <>
              {lead.customers.map((customer, idx) => {
                let val = idx;
                while (val > 3) {
                  console.log("before", val);
                  val -= 4;
                  console.log("after", val);
                }

                return (
                  <Tooltip key={idx} title={customer} placeholder="bottom">
                    <VuiAvatar
                      src={avatars[val]}
                      alt="name"
                      size="xs"
                      sx={{
                        border: ({ borders: { borderWidth }, palette: { dark } }) =>
                          `${borderWidth[2]} solid ${dark.focus}`,
                        cursor: "pointer",
                        position: "relative",

                        "&:not(:first-of-type)": {
                          ml: -1.25,
                        },

                        "&:hover, &:focus": {
                          zIndex: "10",
                        },
                      }}
                    />
                  </Tooltip>
                );
              })}
            </>
            <IconButton aria-label="edit" size="small" color="success" onClick={handleOpenEdit}>
              <EditIcon />
            </IconButton>
            {openEdit && (
              <EditForm
                open={openEdit}
                onClose={handleCloseEdit}
                handleCloseEdit={handleCloseEdit}
                setDataUpdated={setDataUpdated}
                data={lead.customers}
                id={lead.id}
              />
            )}
          </VuiBox>
        ),
        price: (
          <VuiTypography variant="button" color="white" fontWeight="bold">
            {lead.price}
          </VuiTypography>
        ),
        heat_index: (
          <VuiBox width="8rem" textAlign="left">
            <VuiTypography color="white" variant="button" fontWeight="bold">
              {lead.heat_index}/3
            </VuiTypography>
            <VuiProgress
              value={(lead.heat_index * 100) / 3}
              color="info"
              label={false}
              sx={{ background: "#2D2E5F" }}
            />
          </VuiBox>
        ),
        delete: (
          <>
            <IconButton aria-label="delete" size="small" color="error" onClick={handleOpenDeletion}>
              <DeleteIcon />
            </IconButton>
            <Deletion
              open={openDeletion}
              handleClose={handleClose}
              deletion={() => deleteLead(lead.id)}
            />
          </>
        ),
      };
    }),
    leads,
  };
}
