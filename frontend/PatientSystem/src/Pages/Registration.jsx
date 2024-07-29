import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = new URL("http://127.0.0.1:8000/register/");
    url.searchParams.append("username", username);
    url.searchParams.append("password", password);

    fetch(url, {
      method: "POST",
    }).then((data) => {
      return data.text();
    }).then((data) => {
      if (data === '"Success"') {
        navigate('/')
      } else {
        alert('Error: This account already exists. Please verify your details or use a different email to register.')
      }

    })
    .catch((error) => {
      // Log error if any
      alert(error);
      return;
    });
  };
  return (
    <div>
      <div className=" flex">
        <div className="w-[70%] text-center mt-[140px]">
          <h2 className="font-bold text-[32px] text-[#04182B] mb-12">
            Create Account
          </h2>
          <div className="flex flex-col justify-center items-center gap-8">
            <input
              type="email"
              placeholder="Email address"
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
            {" "}
            <button onClick={handleSubmit} className="mt-10 py-3 px-12 rounded-3xl text-[14px] bg-[#3E737A] text-white ">
              Sign up
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

export default Registration;
