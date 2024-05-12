import { deleteDoc, doc } from "firebase/firestore"
import { MdOutlineTaskAlt } from "react-icons/md";
import { IoMdTrash } from "react-icons/io"
import { RiEditCircleLine } from "react-icons/ri"
import { db } from "../config/firebase"
import AddUpdate from "./AddUpdate"
import useDisclose from "../hooks/useDisclose"
import { toast } from "react-toastify"

const TaskCard = ({task}) => {
  const {isOpen, onClose, onOpen}=useDisclose();
  const deleteTask=async (id)=>{
    try {
      await deleteDoc(doc(db, "todolist", id));
      toast.success("task completed");
    } catch (error) {
    }
  }
  return (
    <>
    <div key={task.id} className="bg-yellow flex justify-between items-center p-2 rounded-lg" onClick={onOpen}>
              <div className="flex gap-1">
              <MdOutlineTaskAlt onClick={()=>deleteTask(task.id)} className="text-5xl text-orange cursor-pointer"/>
              <div className="">
                <h2 className="text-xl">
                  {task.Title}
                </h2>
                <p className="text-sm">{task.Description}</p>
              </div>
              </div>
              
              <div className="flex text-4xl">
              <RiEditCircleLine onClick={onOpen} className="cursor-pointer"/>
              </div>
            </div>
            <AddUpdate task={task} isOpen={isOpen} onClose={onClose} isUpdate/>
    </>
  )
}

export default TaskCard