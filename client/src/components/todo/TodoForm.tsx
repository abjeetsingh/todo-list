import axios from "axios";
import React, { useState } from "react";
import { Todo } from "./TodoList";

interface TodoFormProps {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}

const TodoForm = ({ todos, setTodos }: TodoFormProps) => {
  const [title, setTitle] = useState("");
  const onSubmit = () => {
    axios
      .post(
        "/todo",
        { title: title },
        { headers: { token: localStorage.getItem("token") } }
      )
      .then((res) => {
        if (res.status === 200) {
          let todo = res.data.todo;
          setTodos([...todos, todo]);
          setTitle("");
        }
      });
  };
  return (
    <div className="flex justify-between mb-8">
      <input
        type="text"
        placeholder="Enter your task"
        value={title}
        className="w-full px-3 py-2 border-2 border-green-400 rounded-md mr-4"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <input
        type="button"
        value="Add"
        className=" px-5 bg-green-400 text-white rounded-md cursor-pointer"
        onClick={() => onSubmit()}
      />
    </div>
  );
};

export default TodoForm;
