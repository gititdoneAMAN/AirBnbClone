import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PlacesForm from "../components/PlacesForm";
import axios from "axios";

const Places = () => {
  const { action } = useParams();
  const [userPlaces, setUserPlaces] = useState([]);

  useEffect(() => {
    axios
      .get("/userPlacesData", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // console.log(response.data.userData[0].title);
        setUserPlaces(response.data.userData);
        console.log(userPlaces);
      });
  }, [userPlaces]);

  console.log(action);
  return (
    <div>
      {action !== "new" && (
        <div className="text-center mt-5 flex flex-col items-center justify-center mx-9">
          <Link
            to="/account/places/new"
            className="rounded-3xl bg-red-500 text-white w-[400px] pt-2 pb-2 flex justify-center gap-2"
          >
            <span>
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </span>
            Add New Places
          </Link>
          <div className="w-full flex flex-col gap-4 my-4  grow ">
            {userPlaces.map((place, index) => (
              <div
                key={index}
                className=" bg-white py-2 px-4 flex gap-4 items-center rounded-3xl w-full h-[180px] lg:max-w-[1000px] m-auto  "
              >
                <div className="w-[9rem] h-[9rem] shrink-0 bg-gray-200 rounded-2xl">
                  <img
                    src={"http://localhost:3000/uploads/" + place.addedPhotos}
                    alt="photo"
                    className="object-cover w-full h-full rounded-2xl"
                  />
                </div>
                <div className="flex flex-col items-start gap-2  text-left">
                  <h2 className="font-semibold text-xl">{place.title}</h2>
                  <p className="text-gray-500 text-sm">{place.description}</p>
                  <p className="text-gray-900 text-md">{place.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {action === "new" && <PlacesForm />}
    </div>
  );
};

export default Places;
