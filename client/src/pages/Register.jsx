import React from "react";
import Login from "./Login";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex min-h-screen w-full items-centers justify-around overflow-hidden">
      <div className="flex my-[5%] items-center justify-around rounded-3xl  h-[55%] w-[40%] bg-white">
        <div className="h-full w-full py-5 px-8 justify-center items-center">
          <h1 className="text-3xl font-bold mb-5 text-center">Register</h1>

          <form>
            <div>
              <input
                className="w-full bg-[#f3f4f6] rounded-3xl h-[45px] text-xl px-4 pb-2 pt-1 my-[5px]"
                type="text"
                id="username"
                placeholder="Username"
              />
            </div>
            <div>
              <input
                className="w-full bg-[#f3f4f6] rounded-3xl h-[45px] text-xl px-4 pb-2 pt-1 my-[5px]"
                type="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <div>
              <input
                className="w-full bg-[#f3f4f6] rounded-3xl h-[45px] text-xl px-4 pb-2 pt-1 my-[5px]"
                type="text"
                id="fullname"
                placeholder="Fullname"
              />
            </div>
            <button
              type="submit"
              className="bg-[#f5385d] w-full rounded-3xl h-[45px] text-xl px-4 pb-2 pt-1 my-[10px]  font-semibold text-white"
            >
              Login
            </button>
          </form>

          <div className="text-center my-1 pb-2">
            <span>Already have an account?</span>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
