import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useContext, useMemo, useState } from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { v4 as uuidv4 } from "uuid";
import { TodosContext } from "../contexts/TodosContext";
import { useEffect } from "react";
import { SnackBarContext } from "../contexts/SnackBarContext";

export default function TodoList() {
  const { setTodoList, todoList } = useContext(TodosContext);
  const { showHideSnack } = useContext(SnackBarContext);
  const [inputTodo, setInputTodo] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const getAllTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodoList(getAllTodos);
  }, []);
  const addTodo = (content) => {
    const newTodo = {
      id: uuidv4(),
      content: content,
      isFinished: false,
    };
    const addedTodos = [...todoList, newTodo];
    setTodoList(addedTodos);
    localStorage.setItem("todos", JSON.stringify(addedTodos));
    showHideSnack("New todo added successfully! ✅", "success");
  };

  const finishedTodos = useMemo(() => {
    return todoList.filter((t) => {
      console.log("calling completing todos");
      return t.isFinished;
    });
  }, [todoList]);

  const notFinishedTodos = useMemo(() => {
    return todoList.filter((t) => {
      console.log("calling completing todos");
      return !t.isFinished;
    });
  }, [todoList]);

  let todosToBeRendered = todoList;
  if (filter === "done") {
    todosToBeRendered = finishedTodos;
  } else if (filter === "still") {
    todosToBeRendered = notFinishedTodos;
  } else {
    todosToBeRendered = todoList;
  }
  let listOfTodos;
  if (todosToBeRendered.length === 0) {
    listOfTodos = <h3>there are no Todos!</h3>;
  } else {
    listOfTodos = todosToBeRendered.map((t) => {
      return <Todo key={t.id} todoId={t.id} />;
    });
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        minHeight: "300px",
        width: "500px",
        borderRadius: "5px",
        padding: "20px",
      }}
    >
      <div>
        <h1 style={{ margin: "0 0 20px 0" }}>Todos</h1>
        <hr />

        <div style={{ margin: "20px 0" }}>
          <ToggleButtonGroup
            value={filter}
            onChange={(event, newFilter) => setFilter(newFilter)}
            exclusive
            aria-label="todo filter"
          >
            <ToggleButton value="all" aria-label="all todos">
              All
            </ToggleButton>
            <ToggleButton value="done" aria-label="done todos">
              Done
            </ToggleButton>
            <ToggleButton value="still" aria-label="not done todos">
              Still
            </ToggleButton>
          </ToggleButtonGroup>
        </div>

        <div
          style={{ marginBottom: "20px", overflow: "auto", maxHeight: "380px" }}
        >
          {listOfTodos}
        </div>

        <AddTodo
          inputTodo={inputTodo}
          setInputTodo={setInputTodo}
          onAddTodo={addTodo}
        />
      </div>
    </div>
  );
}
