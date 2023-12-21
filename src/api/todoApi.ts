import axios from "axios";
import { TodoType } from "../types/todoType";
import { v4 as uuid } from "uuid";

const TODO_API_URL = `${import.meta.env.VITE_BASE_URL}/todos`;
// const ADD_TODO_ENDPOINT = `${TODO_API_URL}`;
// const GET_TODO_ENDPOINT = `${TODO_API_URL}`;
// const UPDATE_TODO_ENDPOINT = `${TODO_API_URL}`;
// const DELETE_TODO_ENDPOINT = `${TODO_API_URL}`;

export const addTodo = async (todoData: TodoType) => {
  const id = uuid();
  const newTodoData = { ...todoData, id };

  try {
    const res = await axios.post(TODO_API_URL, newTodoData);
    return res.data;
  } catch (err) {
    console.log("err", err);
    throw err;
  }
};

export const getTodos = async () => {
  try {
    return await axios.get(TODO_API_URL);
  } catch (err) {
    console.log(`err :: ${err}`);
    throw err;
  }
};

export const updateTodo = async (id: string, todoData: TodoType) => {
  console.log(`id : ${id}`);
  console.log(`todoData : ${todoData}`);
  try {
    const res = await axios.put(`${TODO_API_URL}/${id}`, todoData);
    return res.data;
  } catch (err) {
    console.log(`err :: ${err}`);
    throw err;
  }
};

export const deleteTodo = async (id: string) => {
  try {
    const res = await axios.delete(`${TODO_API_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.log(`err :: ${err}`);
    throw err;
  }
};
