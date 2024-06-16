import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import { createTask } from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

export default function AddTask() {
  const [newTaskData, setTaskData] = useState({
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

  const handleAddTask = async (e) => {
    e.preventDefault();
    console.log("New Task Data: ", newTaskData);
    let isValid = true;
    if (newTaskData.title.trim() === "") {
      setErrMsg((prevState) => ({ ...prevState, title: "Title is required" }));
      isValid = false;
    }
    if (newTaskData.description.trim() === "") {
      setErrMsg((prevState) => ({
        ...prevState,
        description: "Please give a description",
      }));
      isValid = false;
    }
    if (newTaskData.date.trim() === "") {
      setErrMsg((prevState) => ({ ...prevState, date: "Please enter a date" }));
      isValid = false;
    }
    if (isValid) {
      const formattedDate = new Date(newTaskData.date).toLocaleDateString(
        "en-GB"
      );
      try {
        const data = await createTask({ ...newTaskData, date: formattedDate });
        console.log("Task data: ", data);

        if (data.data && data.status === 201) {
          setMsg("Task Created Successfully");
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
          <p className="text-lg font-bold text-green-600">{msg}</p>
        </div>
      )}
      <div className="w-2/5 rounded-lg border-[1px] border-slate-700 shadow-lg bg-slate-400 text-xl mb-20">
        <form onSubmit={handleAddTask}>
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
              value={newTaskData.title}
            />
            <div className="w-full flex justify-end">
              {errMsg.title && (
                <div className="font-bold text-red-600 flex items-center gap-2">
                  <InfoOutlinedIcon />
                  <p> {errMsg.title}</p>
                </div>
              )}
            </div>
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
                value={newTaskData.description}
              />
            </div>
            <div className="w-full flex justify-end">
              {errMsg.description && (
                <div className="font-bold text-red-600 flex items-center gap-2">
                  <InfoOutlinedIcon />
                  <p> {errMsg.description}</p>
                </div>
              )}
            </div>
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
              value={newTaskData.date}
            />
            <div className="w-full flex justify-end">
              {errMsg.date && (
                <div className="font-bold text-red-600 flex items-center gap-2">
                  <InfoOutlinedIcon />
                  <p> {errMsg.date}</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center gap-8">
            <Button className="bg-blue-500 hover:bg-blue-600 focus:ring-blue-500">
              Submit
            </Button>
            <Link to="/">
              <Button className="bg-red-400  hover:bg-red-600 focus:ring-red-500 ">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
