import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../UserContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { loggedIn, setLoggedIn } = useContext(userContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    const userData = axios
      .post("/login", {
        username,
        password,
      })
      .then((response) => {
        console.log(response.data.user);
        setLoggedIn(response.data.user);
        localStorage.setItem("token", response.data.token);
        alert("Login Successful");
        navigate("/");
      });
  };

  return (
    <div className="flex min-h-screen w-full items-centers justify-around overflow-hidden">
      <div className="flex my-[5%] items-center justify-around rounded-3xl  h-[55%] w-[40%] bg-white">
        <div className="h-full w-full py-5 px-8 justify-center items-center">
          <h1 className="text-3xl font-bold mb-5 text-center">Login</h1>

          <form>
            <div>
              <input
                className="w-full bg-[#f3f4f6] rounded-3xl h-[45px] text-xl px-4 pb-2 pt-1 my-[5px]"
                type="text"
                id="username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                className="w-full bg-[#f3f4f6] rounded-3xl h-[45px] text-xl px-4 pb-2 pt-1 my-[5px]"
                type="password"
                id="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="bg-[#f5385d] w-full rounded-3xl h-[45px] text-xl px-4 pb-2 pt-1 my-[10px] font-semibold text-white"
              onClick={handleSubmit}
            >
              Login
            </button>
          </form>

          <div className="text-center my-1">
            <span>Don't have an account?</span>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
