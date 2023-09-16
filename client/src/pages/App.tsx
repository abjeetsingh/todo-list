import React from "react";
import { useState } from "react";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
const App = () => {
  const [isSignup, setIsSignup] = useState<boolean>(false);
  return (
    <div className="flex w-full h-screen">
      {/* Left Section */}

      <div className="w-1/2 max-w-2xl mx-auto relative">
        <div className="absolute inset-0 m-auto h-[300px] ">
          {(isSignup && (
            <Signup
              renderLogin={() => {
                setIsSignup(false);
              }}
            />
          )) || (
            <Login
              renderSignup={() => {
                setIsSignup(true);
              }}
            />
          )}
        </div>
      </div>

      {/* Left Section Ends */}
      {/* Right Section */}
      <div className="bg-green-400 w-1/2 ">bye</div>
      {/* Right Section Ends */}
    </div>
  );
};

export default App;
