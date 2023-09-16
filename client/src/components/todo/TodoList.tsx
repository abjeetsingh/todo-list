import axios from "axios";
import React from "react";

export interface Todo {
  _id: string;
  title: string;
  isCompleted: boolean;
  author: string;
}

interface TodoListProps {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}

const TodoList = ({ todos, setTodos }: TodoListProps) => {
  const onComplete = (todo: Todo) => {
    console.log(todo.author);
    axios
      .put(
        `/todo/${todo._id}`,
        {},
        { headers: { token: localStorage.getItem("token") } }
      )
      .then((res) => {
        if (res.status === 200) {
          let _todos = todos;
          setTodos(_todos.filter((todo) => res.data.todo._id !== todo._id));
        }
      });
  };
  return (
    <>
      {console.log(todos.filter((todo) => !todo.isCompleted))}
      {todos
        .filter((todo) => !todo.isCompleted)
        .map((todo) => (
          <div
            className="border border-gray-400 p-4 rounded-md mb-4 flex justify-between items-center"
            key={todo._id}
          >
            {todo.title}
            <input
              type="button"
              className="py-2 px-3 bg-green-400 text-white rounded-md cursor-pointer"
              value="DONE"
              onClick={() => {
                onComplete(todo);
              }}
            />
          </div>
        ))}
    </>
  );
};

export default TodoList;
