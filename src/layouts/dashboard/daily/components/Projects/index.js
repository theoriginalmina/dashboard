import { useCallback, useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import AddIcon from "@mui/icons-material/Add";
import { BsCheckCircleFill } from "react-icons/bs";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";

// Vision UI Dashboard Materail-UI example components
import Table from "examples/Tables/Table";

import LeadForm from "layouts/dashboard/daily/components/Projects/LeadForm";

// Data
import Data from "layouts/dashboard/daily/components/Projects/data";

function Projects() {
  const [editedRows, setEditedRows] = useState([]);
  const [currentEditRow, setCurrentEditRow] = useState(null);
  const [activeLeads, setActiveLeads] = useState([]);
  const [dataUpdated, setDataUpdated] = useState(false);
  const { columns, rows, leads } = Data(dataUpdated, setDataUpdated);
  const [open, setOpen] = useState(false);

  const openLeadForm = () => {
    setOpen(true);
  };

  const closeLeadForm = () => {
    setOpen(false);
  };

  function handleEditRow(row) {
    setCurrentEditRow(row);
  }

  function handleSaveRow(row) {
    setEditedRows((prevRows) => {
      const updatedRows = [...prevRows];
      const index = updatedRows.findIndex((r) => r === row);

      if (index !== -1) {
        updatedRows.splice(index, 1, row);
      } else {
        updatedRows.push(row);
      }

      return updatedRows;
    });

    setCurrentEditRow(null);
  }

  const today = new Date();
  const crntMonth = today.getMonth();
  const crntYear = today.getFullYear();

  const calc = (data) => {
    if (data?.length > 0) {
      const filteredArr = leads.filter((d) => {
        const leadMonth = new Date(d.created_at).getMonth();
        const leadYear = new Date(d.created_at).getFullYear();

        return leadMonth === crntMonth && leadYear === crntYear;
      });

      setActiveLeads(filteredArr);
    }
  };

  useEffect(() => {
    if (leads?.length > 0) {
      calc(leads);
    }
  }, [leads]);

  // Calculate the dynamic height based on the number of active leads
  const cardHeight = "auto";

  return (
    <Card
      sx={{
        height: cardHeight,
      }}
    >
      <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="32px">
        <VuiBox mb="auto">
          <VuiTypography color="white" variant="lg" mb="6px" gutterBottom>
            Active Leads
          </VuiTypography>
          <VuiBox display="flex" alignItems="center" lineHeight={0}>
            <BsCheckCircleFill color="green" size="15px" />
            <VuiTypography variant="button" fontWeight="regular" color="text" ml="5px">
              &nbsp;<strong>{activeLeads.length} done</strong> this month
            </VuiTypography>
          </VuiBox>
        </VuiBox>
        <VuiBox color="text" px={2}>
          <VuiButton color="primary" onClick={openLeadForm}>
            <Icon sx={{ fontWeight: "bold" }}>add</Icon>
          </VuiButton>
        </VuiBox>
      </VuiBox>
      <VuiBox
        sx={{
          "& th": {
            borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
              `${borderWidth[1]} solid ${grey[700]}`,
          },
          "& .MuiTableRow-root:not(:last-child)": {
            "& td": {
              borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                `${borderWidth[1]} solid ${grey[700]}`,
            },
          },
        }}
      >
        <Table
          columns={columns}
          rows={rows}
          editedRows={editedRows}
          currentEditRow={currentEditRow}
          onEditRow={handleEditRow}
          onSaveRow={handleSaveRow}
        />
      </VuiBox>
      {open && <LeadForm open={open} onClose={closeLeadForm} setDataUpdated={setDataUpdated} />}
    </Card>
  );
}

export default Projects;