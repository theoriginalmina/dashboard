import Box from "@mui/material/Box";

const RenderEventContent = (eventContent) => {
  const title = eventContent.event.title.slice(0, 7);
  const date = eventContent.timeText;

  return (
    <Box sx={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
      <i>{title}...</i>
      <b>{date}</b>
    </Box>
  );
};

export default RenderEventContent;
