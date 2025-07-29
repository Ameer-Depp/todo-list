import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
export default function Todo({ content, isFinished }) {
  return (
    <div
      className="todos"
      style={{
        width: "100%",
        minHeight: "80px",
        backgroundColor: "#631eb7ff",
        margin: "10px 0px 10px 0px",
        borderRadius: "5px",
      }}
    >
      <Grid
        container
        height="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          size={8}
          style={{
            minHeight: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "left",
          }}
        >
          <div
            style={{
              padding: "5px",
              color: "white",
              maxWidth: "100%",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              fontFamily: "a",
              fontSize: "25px",
            }}
          >
            {content}
          </div>
        </Grid>
        <Grid
          size={4}
          style={{
            minHeight: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            className="icon-button"
            aria-label="check"
            style={{ color: "#1bf838ff" }}
          >
            <CheckCircleIcon />
          </IconButton>
          <IconButton
            className="icon-button"
            aria-label="delete"
            style={{ color: "#ff0000ff" }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            className="icon-button"
            aria-label="edit"
            style={{ color: "#ffffffff" }}
          >
            <EditIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}
