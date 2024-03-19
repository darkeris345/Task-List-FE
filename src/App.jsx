/* eslint-disable react-hooks/exhaustive-deps */
import Form from "./components/Form/Form";
import TaskList from "./components/TaskList/TaskList";
import { useState, useEffect } from "react";
import { getAllDataPaginated } from "./services/get";
import { RiseLoader } from "react-spinners";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./App.css";
import HeaderSearch from "./components/HeaderSearch/HeaderSearch";

const App = () => {
  const [tasks, setTask] = useState([]);
  const [error, setError] = useState("");
  const [update, setUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(4);
  const [searchQuery, setSearchQuery] = useState("");


  const fetchData = async () => {
    try {
      const response = await getAllDataPaginated(page, perPage);
      const { tasks, totalCount } = response.data;
      if (totalCount === 0) throw new Error("No items found");
      setTask(tasks);
      setTotal(totalCount);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [update, page, perPage]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    
   
    <div className="bodyCard">
      <Form setUpdate={setUpdate} tasks={tasks}  />
      <HeaderSearch onSearchChange={handleSearchChange}/>
      {!error && <TaskList setUpdate={setUpdate} tasks={tasks} searchQuery={searchQuery} />}
      {isLoading && <RiseLoader size={4} color="blue" />}
      {error && <p>{error}</p>}
      <Stack spacing={2} alignItems="center">
        <Pagination
          count={
            total % perPage === 0
              ? total / perPage
              : Math.floor(total / perPage) + 1
          }
          defaultPage={page}
          color="secondary"
          variant="outlined"
          onChange={(e, value) => setPage(() => value)}
        />
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">Pages Count</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            label="Per Page Count"
            onChange={(e) => {
              setPerPage(e.target.value);
            }}
            defaultValue={4}
          >
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={8}>8</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </div>
    
    
  );
};

export default App;
