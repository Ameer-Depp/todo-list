import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import TodoList from "./components/TodoList";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodosContext } from "./contexts/TodosContext";
import MySnackBar from "./components/MySnackBar";
import { SnackBarContext } from "./contexts/SnackBarContext";

const theme = createTheme({
  typography: {
    fontFamily: ["a"],
  },
});

const todosList = [
  { id: uuidv4(), content: "create new website", isFinished: false },
  { id: uuidv4(), content: "create new backend", isFinished: false },
  { id: uuidv4(), content: "do dishes", isFinished: false },
];

function App() {
  const [todoList, setTodoList] = useState(todosList);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  function showHideSnackBar(msg, sev = "success") {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <ThemeProvider theme={theme}>
      <SnackBarContext.Provider
        value={{
          showHideSnack: showHideSnackBar,
          message,
          severity,
        }}
      >
        <div
          className="App"
          style={{
            backgroundColor: "#2b2b36",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <MySnackBar open={open} message={message} severity={severity} />
          <TodosContext.Provider
            value={{ todoList: todoList, setTodoList: setTodoList }}
          >
            <TodoList />
          </TodosContext.Provider>
        </div>
      </SnackBarContext.Provider>
    </ThemeProvider>
  );
}

export default App;
