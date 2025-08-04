import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function MySnackBar({ open, message, severity = "success" }) {
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert severity={severity} variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
