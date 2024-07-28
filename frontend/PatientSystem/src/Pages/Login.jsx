import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <div className=" flex">
        <div className="w-[70%] text-center mt-[120px]">
          <h2 className="font-bold text-[32px] text-[#04182B] mb-12">
            Welcome back!
          </h2>
          <div className="flex flex-col justify-center items-center gap-8">
            <input
              type="email"
              placeholder="Email address"
              className="border border-black rounded-lg w-[450px] pl-4 py-[10px]"
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-black rounded-lg w-[450px] pl-4 py-[10px]"
            />
          </div>
          <Link to="/dashboard">
            {" "}
            <button className="mt-10 py-3 px-12 rounded-3xl text-[14px] bg-[#3487e4] text-white ">
              Log in
            </button>
          </Link>
        </div>
        <div className="w-[30%] bg-cover bg-custom-image bg-bottom min-h-screen">
          {" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
