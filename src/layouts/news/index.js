//C:\Users\Ethan Reynolds\Documents\Businesses\Imperial Alpha\Software\ImperialAlphaAIO\vision-ui-dashboard-react-main\src\layouts\news\index.js

import React from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import NewsComp from "./components/newscomp";

function News() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {/* Your News Page Content */}
      <div>
        <h1></h1>
        <NewsComp />
        {/* Add any other components or content you want for the News page */}
      </div>
      <Footer />
    </DashboardLayout>
  );
}

export default News;
