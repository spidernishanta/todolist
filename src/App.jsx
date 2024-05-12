import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import TaskCard from "./components/TaskCard";
import AddUpdate from "./components/AddUpdate";
import useDisclose from "./hooks/useDisclose";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from "./components/NotFound";


const App = () => {
  const [tasks, setTasks] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclose();

  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasksRef = collection(db, "todolist");
        onSnapshot(tasksRef, (snapshot) => {
          const tasksList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Sort tasks by deadline (date) and priority
          tasksList.sort((a, b) => {
            if (a.Deadline === b.Deadline) {
              return a.Priority - b.Priority;
            }
            return a.Deadline - b.Deadline;
          });

          // Set the state with sorted tasks
          setTasks(tasksList);
        });
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getTasks();
  }, []);

  const filterTasks = (e) => {
    const value = e.target.value.toLowerCase();
    const tasksRef = collection(db, "todolist");
    onSnapshot(tasksRef, (snapshot) => {
      const tasksList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filtering tasks based on search value
      let filteredTasks = tasksList.filter(
        (task) =>
          task.Title.toLowerCase().includes(value) ||
          task.Description.toLowerCase().includes(value)
      );

      // Sort filtered tasks by deadline (date) and priority
      filteredTasks.sort((a, b) => {
        if (a.Deadline === b.Deadline) {
          return a.Priority - b.Priority;
        }
        return a.Deadline - b.Deadline;
      });

      // Setting the state with filtered and sorted tasks
      setTasks(filteredTasks);
    });
  };

  return (
    <>
      <div className="mx-auto px-4">
        <Navbar />
        <div className="flex relative items-center gap-2">
          <FiSearch className="text-white text-3xl absolute ml-5" />
          <input onChange={filterTasks} type="text" className="text-white flex-grow bg-transparent border border-white rounded-md h-10 pl-16"></input>
          <AiFillPlusCircle
            className="text-5xl text-white cursor-pointer" onClick={onOpen} />
        </div>
        <div className="flex flex-col gap-3">
          {
            tasks.length <= 0 ?
              <NotFound />
              :
              tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
          }
        </div>
      </div>
      <AddUpdate task={tasks} isUpdate={false} isOpen={isOpen} onClose={onClose} />
      <ToastContainer
        position="bottom-center"
      />
    </>
  );
};

export default App;
