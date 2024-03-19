import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "@mui/joy/CircularProgress";
import { purple } from "@mui/material/colors";
import Button from "@mui/joy/Button";
import { useState } from "react";
import { deleteData } from "../../services/delete";
import { updateData } from "../../services/update";
import Modal from "@mui/joy/Modal";

function TaskCard({ task, setUpdate }) {
  const { _id, taskTitle, priority, progress } = task;
  const priorityOptions = ["Low", "Medium", "High"];
  const [open, setOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({
    taskTitle: task.taskTitle,
    priority: task.priority,
  });
  const [taskProgress, setTaskProgress] = useState(progress);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleTaskProgress = async () => {
    try {
      const progressOrder = ["To Do", "In Progress", "Done"];
      const currentIndex = progressOrder.indexOf(taskProgress);
      const nextIndex = (currentIndex + 1) % progressOrder.length;

      await updateData(_id, { ...task, progress: progressOrder[nextIndex] });
      setTaskProgress(progressOrder[nextIndex]);
      setUpdate((update) => update + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (_id) => {
    try {
      await deleteData(_id);
      setUpdate((update) => update + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSave = async () => {
    await updateData(_id, { ...task, ...editedTask });
    setUpdate((update) => update + 1);
    setOpenEditModal(false);
  };

  const handleEditCancel = () => {
    setOpenEditModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <List
        key={_id}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: 800,
          bgcolor: "background.paper",
          borderRadius: 8,
          boxShadow: 3,
          my: 2,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItem>
          <div>
            <ListItemText
              sx={{ fontWeight: "bold", width: 200, color: "grey" }}
              primary="Task"
            />
            <ListItemText
              className="boldText"
              sx={{ fontWeight: "bold", width: 200 }}
              primary={taskTitle}
            />
          </div>
          <div>
            <ListItemText
              sx={{ fontWeight: "bold", width: 160, color: "grey" }}
              primary="Priority"
            />
            <ListItemText
              className="boldText"
              sx={{
                color:
                  priority === "Low"
                    ? "green"
                    : priority === "Medium"
                    ? "orange"
                    : "red",
              }}
              primary={priority}
            />
          </div>
          <Button
            color="danger"
            loading={false}
            variant="soft"
            sx={{ width: 140, mr: 8, fontWeight: "bold" }}
            onClick={handleTaskProgress}
          >
            {taskProgress}
          </Button>

          <CircularProgress
            determinate
            color="danger"
            value={
              taskProgress === "To Do"
                ? 0
                : taskProgress === "In Progress"
                ? 50
                : 100
            }
            sx={{
              color: purple[600],
              mr: 4,
            }}
          />
        </ListItem>
        <ListItemIcon>
          <EditIcon
            sx={{ mr: 1, ":hover": { cursor: "pointer", color: "#000000" } }}
            onClick={() => setOpenEditModal(true)}
          />
          <DeleteIcon
            sx={{
              color: "red",
              mr: 4,
              ":hover": { cursor: "pointer", color: "#cf03fc" },
            }}
            onClick={() => setOpen(true)}
          />
        </ListItemIcon>
      </List>
      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div
          style={{
            top: "20%",
            position: "absolute",
            width: "100%",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "10px 10px 20px #ccc",
              width: "300px",
              margin: "auto",
            }}
          >
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this task?</p>
            <Button
              color="danger"
              variant="soft"
              onClick={() => deleteHandler(_id)}
              sx={{ mr: 2, fontWeight: "bold", borderRadius: "10px" }}
            >
              Yes
            </Button>
            <Button
              color="success"
              variant="soft"
              onClick={() => setOpen(false)}
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        aria-labelledby="edit-modal-title"
        aria-describedby="edit-modal-description"
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
      >
        <div
          style={{
            display: "flex",
            top: "20%",
            position: "absolute",
            width: "100%",
            padding: "20px",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              height: "300px",
              borderRadius: "10px",
              boxShadow: "10px 10px 20px #ccc",
              width: "300px",
              margin: "auto",
            }}
          >
            <h2>Edit Task</h2>
            <form>
              <label>
                Task Title:
                <input
                  type="text"
                  name="taskTitle"
                  style={{
                    width: "80%",
                    padding: "5px",
                    margin: "5px",
                    height: "30px",
                    borderRadius: "10px",
                    border: "1px solid grey",
                    borderShadow: "1px 1px 1px #ccc",
                  }}
                  value={editedTask.taskTitle}
                  onChange={handleInputChange}
                />
              </label>
              <br />
              <label>
                Priority:
                <div>
                  {priorityOptions.map((option) => (
                    <Button
                      key={option}
                      variant="solid"
                      color={
                        editedTask.priority === option ? "green" : "default"
                      }
                      value={option}
                      sx={{
                        color:
                          option === "Low"
                            ? "green"
                            : option === "Medium"
                            ? "orange"
                            : "red",
                        border:
                          option === "Low"
                            ? "1px solid green"
                            : option === "Medium"
                            ? "1px solid orange"
                            : "1px solid red",
                        mr: 1,
                        ":focus": {
                          backgroundColor:
                            option === "Low"
                              ? "green"
                              : option === "Medium"
                              ? "orange"
                              : "red",
                          color: "white",
                        },
                      }}
                      onClick={() =>
                        handleInputChange({
                          target: { name: "priority", value: option },
                        })
                      }
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </label>
              <br />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  onClick={handleEditSave}
                  sx={{ mr: 2, backgroundColor: "grey" }}
                >
                  Save
                </Button>
                <Button
                  sx={{ backgroundColor: "grey" }}
                  onClick={handleEditCancel}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default TaskCard;
