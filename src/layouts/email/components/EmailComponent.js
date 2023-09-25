// C:\Users\Ethan Reynolds\Documents\Businesses\Imperial Alpha\Software\ImperialAlphaAIO\vision-ui-dashboard-react-main\src\layouts\news\components\mail\index.js

import React from "react";

const EmailComponent = ({ type, html }) => {
  const renderComponent = () => {
    switch (type) {
      case "heading":
        return <h1 dangerouslySetInnerHTML={{ __html: html }} />;
      case "paragraph":
        return <p dangerouslySetInnerHTML={{ __html: html }} />;
      // Add more cases for other components
      default:
        return null;
    }
  };

  return renderComponent();
};

export default EmailComponent;
