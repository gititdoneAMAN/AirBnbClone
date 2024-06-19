import React, { useContext } from "react";
import { userContext } from "../UserContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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
    let style = "rounded-3xl px-4 py-2 shadow-md";

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
            My Profile
          </Link>
          <Link to={"/account/bookings"} className={handleStyle("bookings")}>
            My Bookings
          </Link>
          <Link to={"/account/places"} className={handleStyle("places")}>
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
    </div>
  );
};

export default Account;
