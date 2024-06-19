import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../UserContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { loggedIn, setLoggedIn } = useContext(userContext);

  return (
    <header className="p-4 ">
      <nav className="flex justify-between items-center mx-10">
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-10 rotate-[-90deg]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </div>
          <span className="font-bold text-[30px]">airbnb</span>
        </div>

        <div className="flex gap-4 bg-white  rounded-full px-3 pt-2 pb-3 shadow-md">
          <span className="cursor-pointer">Anywhere</span>
          <span>|</span>
          <span className="cursor-pointer">Anyweek</span>
          <span>|</span>
          <span className="cursor-pointer">Add Guests</span>
        </div>

        <div className="bg-white flex gap-2 items-center rounded-full px-2 pt-1 pb-1 shadow-md cursor-pointer">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-7"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-9"
              onClick={() => navigate(loggedIn ? "/account" : "/login")}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </div>
          {loggedIn ? (
            <div className="font-semibold text-[18px] text-center flex justify-center items-center pb-1">
              {loggedIn.fullname}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
