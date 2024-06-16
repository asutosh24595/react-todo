import Input from "./Input";
import Button from "./Button";
import { useState, useEffect } from "react";
import { editTask } from "../api/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getTasks } from "../api/api";

export default function AddTask() {
  const { id } = useParams();
  const [editTaskData, setTaskData] = useState({
    title: "",
    description: "",
    date: "",
  });

  const [errMsg, setErrMsg] = useState({
    title: "",
    description: "",
    date: "",
  });

  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{
    const fetchData = async () => {
        const tasksData = await getTasks();
        setTaskData(()=>{
            const tasks = [...tasksData.data];
            const taskIndex = tasks.findIndex((item)=> item._id === id);
            return tasks[taskIndex];
        })
    }

    fetchData();
  },[id])

  const handleEditTask = async (e) => {
    e.preventDefault();
    let isValid = true;
    if (editTaskData.title.trim() === "") {
      setErrMsg((prevState) => ({ ...prevState, title: "Title is required" }));
      isValid = false;
    }
    if (editTaskData.description.trim() === "") {
      setErrMsg((prevState) => ({
        ...prevState,
        description: "Please give a description",
      }));
      isValid = false;
    }
    if (editTaskData.date.trim() === "") {
      setErrMsg((prevState) => ({ ...prevState, date: "Please enter a date" }));
      isValid = false;
    }
    if (isValid) {
      try {
        const data = await editTask(editTaskData,id);
        console.log("Task data: ", data);

        if (data.data && data.status === 200) {
          setMsg("Task Updated Successfully");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } else {
          console.log("Unexpected response:", data);
        }
      } catch (error) {
        console.error(error.message);
        setMsg("Request failed. Please try again later");
      }
      setTaskData({
        title: "",
        description: "",
        date: "",
      });
    }
  };
  return (
    <>
      {msg && (
        <div className="border border-slate-800 rounded-md p-4">
          <p className="text-lg text-green-600">{msg}</p>
        </div>
      )}
      <div className="w-2/5 rounded-lg border-[1px] border-slate-700 shadow-lg bg-slate-400 font-mono">
        <form onSubmit={handleEditTask}>
          <div className="w-full flex flex-col gap-4 items-center p-10">
            <Input
              label="Task Title : "
              type="text"
              id="title"
              placeholder="Enter task title"
              onChange={(e) => {
                setTaskData((prevState) => {
                  return { ...prevState, title: e.target.value };
                });
                setErrMsg((prevState) => ({
                  ...prevState,
                  title: "",
                }));
              }}
              value={editTaskData.title}
            />
            {errMsg.title && (
              <div>
                <p>{errMsg.title}</p>
              </div>
            )}
            <div className="w-full flex justify-between items-center gap-4">
              <label className="text-slate-100" htmlFor="description">
                Task Description :{" "}
              </label>
              <textarea
                className="border-[2px] border-gray-400 p-1 w-1/2 rounded-md h-40"
                type="text"
                id="description"
                name="description"
                placeholder="Enter task description here...."
                onChange={(e) => {
                  setTaskData((prevState) => {
                    return { ...prevState, description: e.target.value };
                  });
                  setErrMsg((prevState) => ({
                    ...prevState,
                    description: "",
                  }));
                }}
                value={editTaskData.description}
              />
            </div>
            {errMsg.description && (
              <div>
                <p>{errMsg.description}</p>
              </div>
            )}
            <Input
              label="Task Date : "
              type="date"
              id="date"
              onChange={(e) => {
                setTaskData((prevState) => {
                  return { ...prevState, date: e.target.value };
                });
                setErrMsg((prevState) => ({
                  ...prevState,
                  date: "",
                }));
              }}
              value={editTaskData.date}
            />
            {errMsg.date && (
              <div>
                <p>{errMsg.date}</p>
              </div>
            )}
          </div>
          <div className="flex justify-center gap-8">
            <Button className="bg-green-300">Submit</Button>
            <Link to="/">
              <Button className="bg-red-400">Cancel</Button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
