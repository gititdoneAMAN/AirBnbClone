import React, { useContext } from "react";
import { userContext } from "../UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Places from "./Places";
import Bookings from "./Bookings";

const Account = () => {
  const navigate = useNavigate();

  let { subPage } = useParams();
  console.log(subPage);
  if (subPage === undefined) {
    subPage = "Profile";
  }

  const { loggedIn, setLoggedIn, isReady } = useContext(userContext);

  async function logout() {
    localStorage.removeItem("token");
    setLoggedIn(null);
    navigate("/login");
  }

  if (!isReady) {
    return <div>Loading......</div>;
  }
  if (isReady && !loggedIn) {
    return <div>Please log in to view your account</div>;
  }

  function handleStyle(type = null) {
    let style = "rounded-3xl px-4 py-2 shadow-md flex gap-2";

    if (type === subPage) {
      style += " bg-red-500 text-white";
    } else {
      style += " bg-white";
    }
    return style;
  }

  return (
    <div>
      <nav className="mt-[3rem]">
        <div className="flex justify-center w-full gap-[4rem]">
          <Link to={"/account"} className={handleStyle("Profile")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            My Profile
          </Link>
          <Link to={"/account/bookings"} className={handleStyle("bookings")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            My Bookings
          </Link>
          <Link to={"/account/places"} className={handleStyle("places")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
              />
            </svg>
            My Places
          </Link>
        </div>
      </nav>
      {subPage === "Profile" ? (
        <div className="flex flex-col items-center justify-center mt-8 gap-3">
          <span className="text-xl">{`Hello!, ${loggedIn.fullname}`}</span>
          <button
            onClick={logout}
            className="rounded-3xl bg-red-500 text-white w-full max-w-[400px] pt-1 pb-2 "
          >
            Logout
          </button>
        </div>
      ) : (
        <></>
      )}
      {subPage === "places" ? <Places /> : <></>}
      {subPage === "bookings" ? <Bookings /> : <></>}
    </div>
  );
};

export default Account;
