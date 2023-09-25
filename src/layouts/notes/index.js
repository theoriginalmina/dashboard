import React from "react";
import "./components/css/Indy.css";
import Header from "./components/NoteComponents/Header";
import Notes from "./components/NoteComponents/Notes";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Indy() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="main">
        <Header />
        <Notes />
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default Indy;
