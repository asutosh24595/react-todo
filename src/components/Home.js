import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { deleteTask, getTasks } from "../api/api";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import { motion } from "framer-motion";

export default function Home() {
  const [allTasks, setAllTasks] = useState([]);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const tasksData = await getTasks();
      const tasksWithChecked = tasksData.data.map((task) => ({
        ...task,
        checked: false,
      }));
      setAllTasks(tasksWithChecked);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    console.log("Id: ", id);
    const taskIndex = allTasks.findIndex((item) => item._id === id);
    console.log("Task Index: ", taskIndex);
    if (taskIndex !== -1) {
      const res = await deleteTask(allTasks[taskIndex]);
      if (res.status === 200) {
        setMsg("Task deleted.");
        setTimeout(() => {
          setMsg("");
        }, 3000);
        setAllTasks((prevState) => prevState.filter((item) => item._id !== id));
      }
    }
  };

  const handleCheckboxChange = (id) => {
    setAllTasks((prevState) =>
      prevState.map((task) =>
        task._id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const handleEdit = async (id) => {
    navigate(`/edit-task/${id}`);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="w-2/5 flex justify-end"
      >
        <Link to="/add-task">
          <Button className="bg-blue-300 hover:bg-blue-500 focus:ring-blue-500">
            <PostAddOutlinedIcon />
          </Button>
        </Link>
      </motion.div>
      {msg && (
        <div className="border border-slate-800 rounded-md p-4">
          <p className="text-lg font-bold text-red-600">{msg}</p>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="w-2/5 rounded-lg border-[1px] border-slate-700 shadow-lg bg-slate-400 text-xl mb-20"
      >
        <div className="w-full flex flex-col gap-4 items-start p-5">
          {allTasks.length > 0 ? (
            allTasks.map((item) => (
              <div
                key={item._id}
                className="w-full flex items-center gap-4 border border-black p-2 rounded-lg bg-slate-200 hover:transform hover:scale-105 transition duration-200"
              >
                <span>
                  <Checkbox
                    checked={item.checked}
                    onChange={() => handleCheckboxChange(item._id)}
                  />
                </span>
                <div
                  className={`w-4/5 ${
                    item.checked ? "line-through text-gray-600" : ""
                  }`}
                >
                  <h1 className="font-bold">{item.title}</h1>
                  <h1>{item.description}</h1>
                  <h1 className="text-base">{item.date}</h1>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(item._id)}>
                    <EditIcon />
                  </button>
                  <button onClick={() => handleDelete(item._id)}>
                    <DeleteIcon />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center w-full">
              <p className="text-lg font-bold text-red-800">No Tasks</p>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
