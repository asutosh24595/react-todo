import Home from "./components/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/add-task", element: <AddTask /> },
        { path: "/edit-task/:id", element: <EditTask /> },
      ],
    },
  ]);

  return (
    <div className="font-caveat">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
