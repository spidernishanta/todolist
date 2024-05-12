import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import Modal from "./Modal";
import { Formik, Field, Form } from "formik";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Validation = Yup.object().shape({
  Title: Yup.string().required(""),
  Description: Yup.string().required(""),
  Priority: Yup.number(),
  Deadline: Yup.date().nullable(),
});

const AddUpdate = ({ isOpen, onClose, isUpdate, task }) => {
  const addTask = async (task) => {
    try {
      const tasksRef = collection(db, "todolist");
      await addDoc(tasksRef, task);
      onClose();
      toast.success(task.Title + " added");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (task, id) => {
    try {
      const tasksRef = doc(db, "todolist", id);
      await updateDoc(tasksRef, task);
      onClose();
      toast.success(task.Title + " saved");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={Validation}
          initialValues={
            isUpdate
              ? {
                  Title: task.Title,
                  Description: task.Description,
                  Priority: task.Priority,
                  Deadline: task.Deadline ? new Date(task.Deadline) : null,
                }
              : {
                  Title: "",
                  Description: "",
                  Priority: "",
                  Deadline: null,
                }
          }
          onSubmit={(values) => {
            const timestampDeadline = values.Deadline
              ? values.Deadline.getTime()
              : null;
            const taskData = {
              Title: values.Title,
              Description: values.Description,
              Priority: values.Priority,
              Deadline: timestampDeadline,
            };
            isUpdate ? updateTask(taskData, task.id) : addTask(taskData);
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="Title">Title</label>
                <Field name="Title" className="border h-10" />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="Description">Description</label>
                <Field name="Description" className="border h-10" />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="Priority">Priority</label>
                <Field name="Priority" type="number" className="border h-10" />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="Deadline">Deadline</label>
                <DatePicker
                  selected={values.Deadline}
                  onChange={(date) => setFieldValue("Deadline", date)}
                  dateFormat="MM/dd/yyyy"
                  className="border h-10"
                />
              </div>

              <button
                type="submit"
                className="bg-sky-500 px-3 py-1.5 self-center rounded-lg"
              >
                Save
              </button>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default AddUpdate;