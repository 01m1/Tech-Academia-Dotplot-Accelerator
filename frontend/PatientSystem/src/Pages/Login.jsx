import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import dotplotLogo from "../assets/dotplot_logo.jpeg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = new URL("http://127.0.0.1:8000/adminlogin/");
    url.searchParams.append("username", username);
    url.searchParams.append("password", password);

    fetch(url, {
      method: "GET",
    })
      .then((data) => {
        return data.text();
      })
      .then((data) => {
        if (data.trim() === '"Failure"') {
          alert("Incorrect username or password!");
        } else {
          console.log(data.trim());
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        // Log error if any
        alert(error);
        return;
      });
  };
  return (
    <div className="">
      <div className=" flex">
        <div className="w-[70%] text-center mt-[90px]">
          <img
            src={dotplotLogo}
            alt="Dotplot"
            className="object-cover rounded-lg w-[95px] mx-auto mb-6"
          />
          <h2 className="font-bold text-[32px] text-[#00273F] mb-2">
            Welcome back!
          </h2>
          <p className=" mb-10">
            Don't have an account yet? <a href="/registration">Sign up</a>
          </p>
          <div className="flex flex-col justify-center items-center gap-8">
            <input
              type="username"
              placeholder="Username"
              className="border border-black rounded-lg w-[450px] pl-4 py-[10px]"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-black rounded-lg w-[450px] pl-4 py-[10px]"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <Link to="/dashboard">
            <button
              onClick={handleSubmit}
              className="mt-10 py-3 px-12 rounded-3xl text-[14px] bg-[#3E737A] text-white "
            >
              Log in
            </button>
          </Link>
        </div>
        <div className="w-[30%] bg-cover bg-custom-image bg-bottom min-h-screen"></div>
      </div>
    </div>
  );
};

export default Login;
