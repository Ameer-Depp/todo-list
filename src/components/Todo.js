import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext, useState } from "react";
import { TodosContext } from "../contexts/TodosContext";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { SnackBarContext } from "../contexts/SnackBarContext";

export default function Todo({ todoId }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const { showHideSnack } = useContext(SnackBarContext);

  const [updatedTodo, setUpdatedTodo] = useState("");
  const { todoList, setTodoList } = useContext(TodosContext);

  const currentTodo = todoList.find((t) => t.id === todoId);

  function handleTodoFinished() {
    const updatedTodo = todoList.map((t) => {
      if (t.id === todoId) {
        return { ...t, isFinished: !t.isFinished };
      }
      return t;
    });
    setTodoList(updatedTodo);
    localStorage.setItem("todos", JSON.stringify(updatedTodo));
    const isNowFinished = !currentTodo.isFinished;
    const message = isNowFinished
      ? "Todo completed! 🎉"
      : "Todo marked as incomplete";
    showHideSnack(message, "success");
  }

  // If todo not found, don't render anything
  if (!currentTodo) return null;

  // Delete functionality
  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }
  function handleClose() {
    setShowDeleteDialog(false);
  }
  function handleDelete() {
    const newList = todoList.filter((t) => {
      return t.id !== todoId;
    });

    setTodoList(newList);
    localStorage.setItem("todos", JSON.stringify(newList));
    showHideSnack("Todo deleted successfully!", "error");
  }

  // Update functionality
  function handleUpdateClick() {
    setUpdatedTodo(currentTodo.content); // Pre-fill with current content
    setShowUpdateDialog(true);
  }
  function handleUpdateClose() {
    setShowUpdateDialog(false);
    setUpdatedTodo(""); // Clear the input state
  }
  function handleUpdate() {
    const updatedTodoList = todoList.map((t) => {
      if (t.id === todoId) {
        return { ...t, content: updatedTodo };
      }
      return t;
    });
    setTodoList(updatedTodoList);
    showHideSnack("Todo updated successfully!", "info");

    setShowUpdateDialog(false); // Close dialog after update
  }

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
      <Dialog
        onClose={handleClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure to delete this todo?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            delete this todo, will erase it forever
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleDelete} autoFocus style={{ color: "red" }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        onClose={handleUpdateClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Update Todo</DialogTitle>
        <DialogContent>
          <input
            type="text"
            style={{ height: "30px", width: "400px" }}
            value={updatedTodo}
            onChange={(e) => {
              setUpdatedTodo(e.target.value);
            }}
          ></input>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Close</Button>
          <Button onClick={handleUpdate} autoFocus style={{ color: "red" }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
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
            {currentTodo.content}
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
            onClick={() => {
              handleTodoFinished();
            }}
            className="icon-button"
            aria-label="check"
            style={{
              color: currentTodo.isFinished === true ? "#00ff6fff" : "white",
              backgroundSize: "2px",
            }}
          >
            <CheckCircleIcon />
          </IconButton>
          <IconButton
            onClick={handleDeleteClick}
            className="icon-button"
            aria-label="delete"
            style={{ color: "#ff0000ff" }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={handleUpdateClick}
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
