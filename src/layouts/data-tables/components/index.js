import { useState, useEffect, useCallback } from "react";
import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import dataTableData from "layouts/data-tables/data/dataTableData";
import NewSale from "layouts/data-tables/components/Sale"; // Import the NewSale component
import { supabase } from "supabaseClient.js";
import { useAuth } from "hooks/Auth";

function TablesLayout() {
  const [sales, setSales] = useState([]);
  const [open, setOpen] = useState(false);
  const [dataUpdated, setDataUpdates] = useState(false);

  const { user } = useAuth();
  const userId = user?.id;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(async () => {
    setOpen(false);
    setDataUpdates(true);
  }, []);

  const getSales = useCallback(async () => {
    const { data } = await supabase.from("sales").select().eq("user_id", userId);
    setSales(data);
  }, [userId]);

  useEffect(() => {
    getSales();
    setDataUpdates(false);
  }, [dataUpdated, getSales]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox pt={6} pb={3}>
        <VuiBox mb={3} position="relative">
          <Card>
            <VuiBox p={3} pl={0} lineHeight={1}>
              <VuiTypography variant="h5" fontWeight="medium" color="white">
                Vehicle Sales
              </VuiTypography>
              <VuiTypography variant="button" fontWeight="regular" color="text">
                Every Car Sale is Listed Here
              </VuiTypography>
            </VuiBox>
            <VuiBox position="absolute" top={0} right={0} m={3}>
              {/* "Add Sale" Button */}
              <VuiButton variant="contained" color="primary" onClick={handleClickOpen}>
                Add Sale
              </VuiButton>
            </VuiBox>
            {/* {isFormOpen && <NewSale isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />}{" "} */}
            <NewSale open={open} handleClose={handleClose} setDataUpdates={setDataUpdates} />

            {/* Render NewSale when isFormOpen is true */}
            <DataTable
              table={{ columns: dataTableData.columns, rows: [...dataTableData["rows"], ...sales] }}
              canSearch
              setDataUpdates={setDataUpdates}
            />
          </Card>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default TablesLayout;
