// contexts/SnackBarContext.js
import { createContext } from "react";

export const SnackBarContext = createContext({
  showHideSnack: () => {},
  message: "",
  severity: "success",
});
