import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodosContext } from "./contexts/TodosContext";

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
        <TodosContext.Provider
          value={{ todoList: todoList, setTodoList: setTodoList }}
        >
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;
