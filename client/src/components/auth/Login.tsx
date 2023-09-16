import axios from "axios";
import React, { useState } from "react";

interface LoginProps {
  renderSignup: () => void;
}
const Login = ({ renderSignup }: LoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    axios
      .post("/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          const token = res.data.token;
          localStorage.setItem("token", token);

          window.location.href = "/dashboard";
        } else {
        }
      });
  };
  return (
    <div className="h-[300px]">
      <h1 className="text-center text-green-400 font-bold">login</h1>
      <div className="mb-4">
        <label className="mb-10">username</label>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          className="w-full py-2 px-3 border border-gray-400 rounded-md"
          placeholder="username"
        />
      </div>
      <div className="mb-4">
        <label>password</label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="w-full py-2 px-3 border border-gray-400 rounded-md"
          type="password"
          placeholder="password"
        />
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p>
            No account?{" "}
            <span
              className="text-green-400 cursor-pointer"
              onClick={renderSignup}
            >
              Sign up
            </span>
          </p>
        </div>
        <button
          className="rounded-md px-6 py-3 font-bold bg-green-400 text-white"
          onClick={onSubmit}
        >
          {" "}
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
