import { useReducer, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

//Init state
const initState = {
  job: "",
  jobs: ["Rua bat"],
};

//Action
// const SET_JOB = "set_job";
// const ADD_JOB = "add_job";
// const DELETE_JOB = "delete_job";

const setJob = (payload) => {
  return {
    type: "SET_JOB",
    payload,
  };
};

const addJob = (payload) => {
  return {
    type: "ADD_JOB",
    payload,
  };
};

const deleteJob = (payload) => {
  return {
    type: "DELETE_JOB",
    payload,
  };
};

//Reducer
const reducer = (state, action) => {
  let newState;

  switch (action.type) {
    case "SET_JOB":
      newState = {
        ...state,
        job: action.payload,
      };
      break;
    case "ADD_JOB":
      newState = {
        ...state,
        jobs: [...state.jobs, action.payload],
      };
      break;
    case "DELETE_JOB":
      const newJobs = [...state.jobs];

      newJobs.splice(action.payload, 1);

      newState = {
        ...state,
        jobs: newJobs,
      };
      break;
    default:
      throw new Error("Invalid Action");
  }
  return newState;
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const { job, jobs } = state;

  const inputRef = useRef();

  const handleAdd = () => {
    dispatch(addJob(job));
    dispatch(setJob(""));

    inputRef.current.focus();
  };

  const handleDelete = (index) => {
    dispatch(deleteJob(index));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{ padding: "8 20px" }}>
          <h3>Todo</h3>
          <input
            ref={inputRef}
            value={job}
            placeholder="Enter todo..."
            onChange={(e) => dispatch(setJob(e.target.value))}
          />
          <button onClick={handleAdd}>Add</button>
          <ul>
            {jobs.map((job, index) => (
              <li key={index}>
                {job}{" "}
                <span
                  onClick={() => {
                    handleDelete(index);
                  }}
                >
                  &times;
                </span>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default App;
