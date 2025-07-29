import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import { v4 as uuidv4 } from "uuid";

const todosList = [
  { id: uuidv4(), content: "create new website", isFinished: false },
  { id: uuidv4(), content: "create new backend", isFinished: false },
  { id: uuidv4(), content: "do dishes", isFinished: false },
];

export default function TodoList() {
  const [todoList, setTodoList] = useState(todosList);
  const [inputTodo, setInputTodo] = useState("");

  const addTodo = (content) => {
    const newTodo = {
      id: uuidv4(),
      content: content,
      isFinished: false
    };
    setTodoList([...todoList, newTodo]);
  };

  const listOfTodos = todoList.map((t) => {
    return <Todo key={t.id} content={t.content} isFinished={t.isFinished} />;
  });

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
          <ToggleButtonGroup exclusive aria-label="todo filter">
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

        <div style={{ marginBottom: "20px" }}>{listOfTodos}</div>

        <AddTodo 
          inputTodo={inputTodo}
          setInputTodo={setInputTodo}
          onAddTodo={addTodo}
        />
      </div>
    </div>
  );
}