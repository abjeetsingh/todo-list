import React from "react";
import Logout from "./auth/Logout";
const Navbar = () => {
  return (
    <div className="flex justify-between bg-green-400 px-8 py-6 text-white">
      <p className="font-bold text-xl">Mern Todo</p>
      <Logout />
    </div>
  );
};

export default Navbar;
