import { useState } from "react";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlineClose,
  AiOutlinePlus,
} from "react-icons/ai";
import { TodoType } from "../types/todoType";
import { useFormik } from "formik";
import * as Yup from "yup";
import { deleteTodo, updateTodo } from "../api/todoApi";

type todoItemType = {
  todoItem: TodoType;
  onUpdate: (e: any) => void;
  onStatusUpdate: (e: any) => void;
  onDelete: (e: any) => void;
};

export const TodoItem = ({
  todoItem,
  onUpdate,
  onStatusUpdate,
  onDelete,
}: todoItemType) => {
  const { id, task, status } = todoItem;
  const [edit, setEdit] = useState<boolean>(false);
  const [todoUpdateTask, setTodoUpdateTask] = useState<string>(todoItem.task);

  const formik = useFormik({
    initialValues: { ...todoItem },
    validationSchema: Yup.object({
      task: Yup.string()
        .min(3, "Must be 3 characters or more")
        .max(30, "Must be 30 characters or less")
        .required(),
    }),
    onSubmit: async (values, actions) => {
      console.log(`values:: ${values}`);
      try {
        const res = await updateTodo(values.id, values);
      } catch (err) {
        console.log(`error updating todo`);
      }
    },
  });

  // input value change event
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoUpdateTask(e.target.value);
  };

  // update
  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoUpdateTask.trim().length === 0) {
      window.alert("Please enter your details");
      return;
    }
    onUpdate({ ...todoItem, task: todoUpdateTask });
    setEdit(false);
  };

  const handleStatusUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const status = e.target.checked ? "completed" : "active";
    onStatusUpdate({ ...todoItem, status });
  };

  // delete
  const handleDelete = () => onDelete(todoItem);

  return (
    <li
      key={id}
      className="flex text-lg leading-10 border-b border-gray-300 items-center p-2"
    >
      {edit ? (
        <form
          className="flex gap-2 flex-auto shrink-0"
          onSubmit={formik.handleSubmit}
        >
          <input
            type="text"
            placeholder={todoUpdateTask}
            value={todoUpdateTask}
            onChange={handleChange}
            className="py-2 px-3 block w-full rounded-lg border-gray-200 bg-gray-100"
          />
          <div className="flex gap-2">
            <button className="p-1 my-2 bg-gray-200">
              <AiOutlinePlus />
            </button>
            <button
              onClick={() => setEdit(false)}
              className="p-1 my-2 bg-gray-200"
            >
              <AiOutlineClose />
            </button>
          </div>
        </form>
      ) : (
        <>
          {/* <input
            type="checkbox"
            name={id}
            id={id}
            checked={status === "completed"}
            onChange={handleStatusUpdate}
            className="peer/checked appearance-none w-5 h-5  border-blue-500 rounded-md bg-white mt-1 shrink-0 checked:bg-blue-800 checked:border-0"
          /> */}
          <label
            htmlFor={id}
            className="flex-auto shrink-0 pl-2 checked:line-through peer-checked/checked:text-slate-300 peer-checked/checked:line-through"
          >
            {task}
          </label>
          <div className={`flex gap-2 ${edit ? `hidden` : `flex`} `}>
            {/* <button
              onClick={() => setEdit(true)}
              className="p-1 my-2 bg-gray-200"
            >
              <AiFillEdit />
            </button> */}
            <button onClick={handleDelete} className="p-1 my-2 bg-gray-200">
              <AiFillDelete />
            </button>
          </div>
        </>
      )}
    </li>
  );
};
