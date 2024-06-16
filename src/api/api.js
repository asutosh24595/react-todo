import axios from "axios";

export const getTasks = async () => {
  try {
    const response = await axios.get("http://localhost:3030/api/all-tasks");
    return response;
  } catch (err) {
    throw err;
  }
};

export const createTask = async ({ title, description, date }) => {
  try {
    const response = await axios.post("http://localhost:3030/api/add-task", {
      title,
      description,
      date,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await axios.post("http://localhost:3030/api/delete-task", {
      id,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export const editTask = async ({ title, description, date }, id) => {
  try {
    const response = await axios.put(`http://localhost:3030/api/edit-task/${id}`, {
      title,
      description,
      date,
    });
    console.log("Edit response: ", response);
    return response;
  } catch (err) {
    throw err;
  }
};
