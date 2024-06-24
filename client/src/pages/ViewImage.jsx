import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewImage = ({ photoArray, setView }) => {
  const { id } = useParams();
  const [photoIndex, setPhotoIndex] = useState(0);

  // const leftDivRef = useRef(null);
  // const rightDivRef = useRef(null);
  // const photoArray = data.split(",");
  console.log(photoArray);

  function handleClickLeft() {
    if (photoIndex == 0) {
      console.log("-----------", photoIndex);
      setPhotoIndex(photoArray.length - 1);
    } else {
      console.log(photoIndex);
      setPhotoIndex((prev) => prev - 1);
    }
  }
  function handleClickRight() {
    if (photoIndex == photoArray.length - 1) {
      console.log(photoIndex);
      setPhotoIndex(0);
    } else {
      console.log(photoIndex);
      setPhotoIndex((prev) => prev + 1);
    }
  }

  // useEffect(() => {
  //   leftDivRef.current.addEventListener("click", handleClickLeft);
  //   rightDivRef.current.addEventListener("click", handleClickRight);

  //   return () => {
  //     leftDivRef.current.removeEventListener("click", handleClickLeft);
  //     rightDivRef.current.removeEventListener("click", handleClickRight);
  //   };
  // }, [photoArray, photoIndex]);

  return (
    <div className="bg-black w-full absolute top-0 z-30 h-screen flex items-center justify-center">
      <div className="relative">
        <div className="bg-white w-[1000px] h-[600px]">
          <img
            src={"http://localhost:3000/uploads/" + photoArray[photoIndex]}
            alt="image"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          // ref={leftDivRef}
          onClick={handleClickLeft}
          className="absolute top-[15rem] left-[-5.5rem] rounded-full cursor-pointer bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-[5rem] h-[5rem]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </div>
        <div
          // ref={rightDivRef}
          onClick={handleClickRight}
          className="absolute top-[15rem] right-[-5.5rem] rounded-full cursor-pointer bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-[5rem] h-[5rem]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
        <div
          onClick={() => setView(false)}
          className="absolute top-0 right-[-2.5rem] rounded-full cursor-pointer bg-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-[2rem] h-[2rem]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ViewImage;
