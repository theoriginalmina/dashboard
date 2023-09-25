//C:\Users\Ethan Reynolds\Documents\Businesses\Imperial Alpha\Software\ImperialAlphaAIO\frontendv0.2\src\widgets\presold\index.js

// Presale.js
import React, { useCallback, useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import { BsCheckCircleFill } from "react-icons/bs";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import Table from "examples/Tables/Table";
import PresaleForm from "./PresaleForm"; // Corrected the file path
import Data from "./data/index.js"; // Corrected the file path
import { supabase } from "supabaseClient";
import { useAuth } from "hooks/Auth";

function Presale() {
  const [editedRows, setEditedRows] = useState([]);
  const [currentEditRow, setCurrentEditRow] = useState(null);
  const [dataUpdated, setDataUpdated] = useState(false);
  const { columns, rows, presales } = Data(dataUpdated, setDataUpdated); // Pass dataUpdated and setDataUpdated as props
  const [open, setOpen] = useState(false);

  const openPresaleForm = () => {
    setOpen(true);
  };

  const closePresaleForm = () => {
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
            Presales
          </VuiTypography>
          <VuiBox display="flex" alignItems="center" lineHeight={0}>
            <BsCheckCircleFill color="green" size="15px" />
            <VuiTypography variant="button" fontWeight="regular" color="text" ml="5px">
              &nbsp;<strong>{presales.length} done</strong> this month {/* Use presales, not Presale */}
            </VuiTypography>
          </VuiBox>
        </VuiBox>
        <VuiBox color="text" px={2}>
          <VuiButton color="primary" onClick={openPresaleForm}>
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
      {open && <PresaleForm open={open} onClose={closePresaleForm} setDataUpdated={setDataUpdated} />}
    </Card>
  );
}

export default Presale;
