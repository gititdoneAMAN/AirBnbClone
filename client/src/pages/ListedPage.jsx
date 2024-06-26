import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ViewImage from "./ViewImage";
import BookingWidget from "../components/BookingWidget";

const ListedPage = () => {
  const { id } = useParams();
  const [listedPlaceData, setListedPlaceData] = useState({});
  const [ready, setReady] = useState(false);
  const [view, setView] = useState(false);

  useEffect(() => {
    axios.get("/listedPlace/" + id).then((response) => {
      setListedPlaceData(response.data.listedPlace);
      setReady(true);
      console.log("-----------------------------------------@@");
      console.log(response.data.listedPlace.addedPhotos[0]);
      console.log("You serious", listedPlaceData.addedPhotos[0]);
    });
  }, [id]);

  return (
    <div>
      {ready && !view && (
        <div>
          <div className="my-5 mx-[4rem] bg-white p-3 rounded-2xl h-[600px] flex flex-col ">
            <div>
              <h1 className="text-3xl font-semibold">
                {listedPlaceData.title}
              </h1>
              <p className="text-gray-500 text-lg">{listedPlaceData.address}</p>
            </div>
            <div className="grid grid-cols-[2fr_1fr] gap-3 rounded-3xl h-full w-full">
              <img
                src={
                  "http://localhost:3000/uploads/" +
                  listedPlaceData.addedPhotos[0]
                }
                alt="img"
                className=" object-cover rounded-xl  h-[500px] w-full"
              />
              <div className="grid gap-1 relative ">
                <img
                  src={
                    "http://localhost:3000/uploads/" +
                    listedPlaceData.addedPhotos[1]
                  }
                  alt="img"
                  className=" object-cover rounded-xl h-[240px] w-full"
                />
                <img
                  src={
                    "http://localhost:3000/uploads/" +
                    listedPlaceData.addedPhotos[2]
                  }
                  alt=""
                  className="object-cover rounded-xl  h-[240px] w-full"
                />
                <div
                  to={"/places/view/" + listedPlaceData.addedPhotos}
                  onClick={() => setView((prev) => !prev)}
                  className="cursor-pointer absolute bottom-3 right-0 p-2 m-2 bg-gray-100 rounded-xl opacity-80 flex gap-1 "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-6 "
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  See More Photos.
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[2fr_1fr] mx-[4rem] my-8 gap-3">
            <div>
              <div className="flex flex-col gap-3">
                <h2 className="text-3xl font-semibold">Description</h2>
                <p className="text-gray-500 text-md">
                  {listedPlaceData.description}
                </p>
              </div>
              <div className="my-5 text-lg font-medium">
                <p>{`CheckIn Timing : ${listedPlaceData.checkIn}`}</p>
                <p>{`CheckOut Timing : ${listedPlaceData.checkout}`}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold">Important Information</h2>
                <p className="text-gray-500 text-md">
                  {listedPlaceData.extraInfo}
                </p>
              </div>
            </div>
            <div>
              <BookingWidget listedPlaceData={listedPlaceData} />
            </div>
          </div>
        </div>
      )}
      {ready && view && (
        <div>
          {view && (
            <ViewImage
              photoArray={listedPlaceData.addedPhotos}
              setView={setView}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ListedPage;
