import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

const theme = createTheme({
  typography: {
    fontFamily: ["a"],
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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
        <TodoList />
      </div>
    </ThemeProvider>
  );
}

export default App;
