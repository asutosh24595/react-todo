import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-custom-image bg-cover bg-center flex flex-col justify-center items-center gap-10">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="text-6xl font-bold text-center text-slate-700"
      >
        To-Do List
      </motion.header>
      <Outlet />
    </div>
  );
}
