import React, { useState } from "react";
import axios from "axios";

const PhotoUploader = ({ addedPhotos, setAddedPhotos, link, setLink }) => {
  async function uploadViaLink(e) {
    e.preventDefault();
    console.log("Hello");
    const response = await axios.post("/uploadImage", { link: link });
    console.log(response.data.filename);
    setAddedPhotos((prev) => [...prev, response.data.filename]);
    console.log(`Added photo length: ${addedPhotos.length}`);
    setLink("");
  }

  async function handleUploads(e) {
    e.preventDefault();
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("photos", e.target.files[i]);
    }
    const response = await axios.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
    setAddedPhotos((prev) => [...prev, ...response.data]);
    console.log(`Added photo length: ${addedPhotos.length}`);
  }
  return (
    <div>
      <div className="flex flex-col my-2">
        <label className="text-[24px] " htmlFor="Photos">
          Photos
        </label>
        <div className="flex gap-2">
          <input
            className="pt-1 pb-2 rounded-3xl text-xl px-4 shadow-sm w-full"
            type="text"
            name="photos"
            id="photos"
            placeholder="Upload via link......"
            onChange={(e) => setLink(e.target.value)}
            required
          />
          <button
            onClick={uploadViaLink}
            className="rounded-3xl bg-red-500 text-white w-full max-w-[200px] pt-2 pb-2 flex justify-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add
          </button>
        </div>
        <div className="my-4 grid grid-cols-6 gap-2">
          {addedPhotos.length > 0 &&
            addedPhotos.map((addedPhoto, index) => {
              return (
                <div key={index} className="h-[100px] rounded-3xl">
                  <img
                    src={"http://localhost:3000/uploads/" + addedPhoto}
                    alt="img"
                    className="h-full w-full object-cover rounded-xl"
                  />
                </div>
              );
            })}
          <label className="bg-white cursor-pointer rounded-3xl shadow-md py-2 px-2 flex items-center justify-center gap-1 w-[200px] h-[100px] text-center">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleUploads}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
              />
            </svg>
            Upload
          </label>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploader;
