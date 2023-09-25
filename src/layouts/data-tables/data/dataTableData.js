export default {
  columns: [
    { Header: "CUSTOMER", accessor: "customer_name", width: "5%" },
    { Header: "YEAR", accessor: "year", width: "5%" },
    { Header: "MAKE", accessor: "make", width: "5%" },
    { Header: "MODEL", accessor: "model", width: "5%" },
    { Header: "TRIM", accessor: "trim", width: "5%" },
    { Header: "CONDITION", accessor: "condition", width: "5%" }, // Added the new column
    { Header: "SALE PRICE", accessor: "sale", width: "5%" },
    { Header: "PROFIT", accessor: "profit", width: "5%" },
    { Header: "COMMISSION", accessor: "commission", width: "7.5%" },
    { Header: "LEAD SOURCE", accessor: "lead_source", width: "10%" },
    { Header: "TIME TO SELL", accessor: "timetosell", width: "10%" },
    { Header: "DATE", accessor: "date", width: "7.5%" },
    { Header: "COUNT", accessor: "count", width: "5%" },
    { Header: "CHIT", accessor: "chit", width: "5%" },
    { accessor: "edit", width: "10%" },
  ],

  rows: [],
  pageSize: 60, // Removed curly braces
  rowsPerPageOptions: [5], // Move this line inside the object
};
