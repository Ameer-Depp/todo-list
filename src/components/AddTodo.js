import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function AddTodo({ inputTodo, setInputTodo, onAddTodo }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputTodo.trim() !== "") {
      onAddTodo(inputTodo.trim());
      setInputTodo("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          height="100%"
          width="100%"
          alignItems="center"
          justifyContent="center"
          spacing={1}
        >
          <Grid
            size={4}
            style={{
              minHeight: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              type="submit"
              fullWidth
              style={{
                height: "100%",
                minHeight: "60px",
                margin: 0,
                borderRadius: 0,
                backgroundColor: "#313033ff",
              }}
            >
              Add Todo
            </Button>
          </Grid>
          <Grid
            size={8}
            style={{
              minHeight: "60px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextField
              id="outlined-basic"
              placeholder="Enter todo"
              variant="outlined"
              value={inputTodo}
              onChange={(e) => setInputTodo(e.target.value)}
              style={{
                height: "100%",
                width: "100%",
                margin: 0,
              }}
              InputProps={{
                style: {
                  height: "60px",
                  borderRadius: 0,
                },
              }}
            />
          </Grid>
        </Grid>
      </form>
    </div>
  );
}