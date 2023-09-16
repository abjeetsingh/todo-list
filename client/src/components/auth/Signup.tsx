import React, { useEffect, useState } from "react";
import axios from "axios";
interface SignupProps {
  renderLogin: () => void;
}

const Signup = ({ renderLogin }: SignupProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disabled, setDisabled] = useState(true);

  const onSubmit = () => {
    axios
      .post("/signup", {
        username: username,
        password: password,
      })
      .then((res) => res);
  };
  useEffect(() => {
    if (confirmPassword === password) setDisabled(false);
    else setDisabled(true);
  }, [confirmPassword, password]);

  return (
    <div className="h-[300px]">
      <h1 className="text-center text-green-400 font-bold">Sign Up</h1>
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
      <div className="mb-4">
        <label>Confirm Password</label>
        <input
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          className="w-full py-2 px-3 border border-gray-400 rounded-md"
          type="password"
          placeholder="Confirm Password"
        />
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p>
            Already a member?
            <span
              className="text-green-400 cursor-pointer"
              onClick={renderLogin}
            >
              Login
            </span>
          </p>
        </div>
        <button
          className={`rounded-md px-6 py-3 font-bold text-white ${
            disabled ? "bg-gray-400" : "bg-green-400"
          }`}
          disabled={disabled}
          onClick={onSubmit}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Signup;
