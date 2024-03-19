import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./Form.css";
import Button from "@mui/joy/Button";
import { postData } from "../../services/post";

function Form({ tasks, setUpdate }) {
  const [isFormVisible, setFormVisible] = useState(false);
  const [error, setError] = useState("");
  const [priority, setPriority] = useState("");

  const handleForm = () => {
    setFormVisible(!isFormVisible);
  };

  const handlePriorityClick = (value) => {
    setPriority(value);
    setValue("priority", value, { shouldValidate: true });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      taskTitle: "",
      priority: "",
      progress: "To Do",
    },
  });

  const formSubmitHandler = (data) => {
    try {
      postData({ ...data, progress: "To Do" });
      setUpdate((update) => update + 1);
      handleForm();
      reset();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (tasks) {
      setValue("taskTitle", tasks.taskTitle, { shouldValidate: true });
      setValue("priority", tasks.priority, { shouldValidate: true });
      setValue("progress", tasks.progress, { shouldValidate: true });
    }
  }, [setValue, tasks]);

  return (
    <>
      <div className="form">
        <h1>Task List</h1>
        <Button
          variant="solid"
          color="danger"
          size="lg"
          style={{ marginTop: "10px", height: "50px" }}
          onClick={handleForm}
        >
          + Add Task
        </Button>
      </div>

      {isFormVisible && (
        <div className="formContainer">
          <form className="formCard" onSubmit={handleSubmit(formSubmitHandler)}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                marginTop: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <h2>Add Task</h2>
              <Button
                className="close"
                sx={{
                  fontSize: "1.5rem",
                  marginLeft: "1.5rem",
                  backgroundColor: "transparent",
                  color: "black",
                  ":hover": { backgroundColor: "transparent" },
                }}
                onClick={() => {
                  handleForm();
                  reset();
                }}
              >
                X
              </Button>
            </div>
            <div>
              <label style={{ marginRight: "1.5rem" }} htmlFor="taskTitle">
                Task Title
              </label>
              <input
                className="inputTask"
                placeholder="Type in your task..."
                type="text"
                id="taskTitle"
                {...register("taskTitle", {
                  required: true,
                  minLength: {
                    value: 4,
                    message: "Minimum length should be 4 characters",
                  },
                })}
              />
              <div style={{ color: "red" }}>{errors.taskTitle?.message}</div>
            </div>
            <div>
              <label style={{ marginLeft: "1rem" }} htmlFor="priority">
                Priority
              </label>
              <div className="priorityButtons">
                <button
                  type="button"
                  className={`priorityButtonLow ${
                    priority === "Low" ? "active" : ""
                  }`}
                  onClick={() => handlePriorityClick("Low")}
                >
                  Low
                </button>
                <button
                  type="button"
                  className={`priorityButtonMedium ${
                    priority === "Medium" ? "active" : ""
                  }`}
                  onClick={() => handlePriorityClick("Medium")}
                >
                  Medium
                </button>
                <button
                  type="button"
                  className={`priorityButtonHigh ${
                    priority === "High" ? "active" : ""
                  }`}
                  onClick={() => handlePriorityClick("High")}
                >
                  High
                </button>
              </div>
              <input
                id="priority"
                type="hidden"
                value={priority}
                {...register("priority", { required: true })}
              />
            </div>
            <button
              disabled={!priority || !!errors.taskTitle}
              type="submit"
              className="submitBtn"
              style={{ marginTop: "1rem" }}
            >
              Add
            </button>
          </form>
        </div>
      )}
      {error && <p>{error}</p>}
    </>
  );
}

export default Form;
