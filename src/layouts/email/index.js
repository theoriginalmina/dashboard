//C:\Users\Ethan Reynolds\Documents\Businesses\Imperial Alpha\Software\ImperialAlphaAIO\vision-ui-dashboard-react-main\src\layouts\email\index.js
import React, { useState, useEffect, useRef } from "react";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import EmailEditor from "react-email-editor";

const EmailBuilder = () => {
  const emailEditorRef = useRef(null);
  const [exportedHtml, setExportedHtml] = useState("");

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { html } = data;
      setExportedHtml(html);
    });
  };

  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    // const templateJson = {};
    // emailEditorRef.current.editor.loadDesign(templateJson);
  };

  const onReady = () => {
    // editor is ready
    console.log("onReady");
  };

  useEffect(() => {
    const unlayerScript = document.createElement("script");
    unlayerScript.src = "https://editor.unlayer.com/embed.js";
    unlayerScript.async = true;
    document.body.appendChild(unlayerScript);

    unlayerScript.onload = () => {
      // eslint-disable-next-line no-undef
      unlayer.init({
        id: "editor",
        projectId: 175103,
        templateId: "[TEMPLATE-ID]", // Replace [TEMPLATE-ID] with your actual template ID
      });
    };

    return () => {
      document.body.removeChild(unlayerScript);
    };
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div>
        <button onClick={exportHtml}>Export HTML</button>
      </div>
      <div id="editor">
        <EmailEditor ref={emailEditorRef} onLoad={onLoad} onReady={onReady} />
      </div>
      {exportedHtml && (
        <div>
          <h2>Exported HTML:</h2>
          <pre>{exportedHtml}</pre>
        </div>
      )}
      <Footer />
    </DashboardLayout>
  );
};

export default EmailBuilder;
