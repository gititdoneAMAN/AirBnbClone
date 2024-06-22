import axios from "axios";
import React, { useState } from "react";
import PhotoUploader from "./PhotoUploader";
import { useNavigate } from "react-router-dom";

const PlacesForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkout, setCheckout] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [link, setLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      "/places",
      {
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn: parseInt(checkIn, 10),
        checkout: parseInt(checkout, 10),
        maxGuests: parseInt(maxGuests, 10),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    alert("Place created!");
    navigate("/account/places");
  };

  function handlePerks(e) {
    const { checked, name } = e.target;
    if (checked) {
      setPerks((prev) => [...prev, name]);
    } else {
      setPerks((prev) =>
        prev.filter((selectedPerks) => selectedPerks !== name)
      );
    }
  }

  return (
    <div className="mx-10">
      <form>
        <div className="flex flex-col my-2">
          <label className="text-[24px] " htmlFor="title">
            Title
          </label>
          <input
            className="pt-1 pb-2 rounded-3xl text-xl px-4 shadow-sm"
            type="text"
            name="title"
            id="title"
            placeholder="Enter the title for the place."
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col my-2">
          <label className="text-[24px] " htmlFor="address">
            Address
          </label>
          <input
            className="pt-1 pb-2 rounded-3xl text-xl px-4 shadow-sm"
            type="text"
            name="address"
            id="address"
            placeholder="Enter the Address of the place."
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <PhotoUploader
          setLink={setLink}
          addedPhotos={addedPhotos}
          setAddedPhotos={setAddedPhotos}
          link={link}
        />
        <div>
          <div className="flex flex-col my-2">
            <label className="text-[24px] " htmlFor="description">
              Description
            </label>
            <textarea
              className="pt-1 pb-2 rounded-3xl text-xl px-4 w-full h-[200px] shadow-sm"
              type="text"
              name="description"
              id="description"
              placeholder="Enter the Description of the place."
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="my-2">
            <label className="text-[24px] " htmlFor="description">
              Perks
            </label>
            <div className="grid grid-cols-6 gap-2">
              <label
                className={
                  "bg-white flex items-center gap-2 px-2 w-full h-[50px]"
                }
              >
                <input type="checkbox" name="wifi" onChange={handlePerks} />
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
                    d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
                  />
                </svg>
                Wifi
              </label>
              <label
                className={
                  "bg-white flex items-center gap-2 px-2 w-full h-[50px]"
                }
              >
                <input type="checkbox" name="parking" onChange={handlePerks} />
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
                    d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
                Parking
              </label>
              <label
                className={
                  "bg-white flex items-center gap-2 px-2 w-full h-[50px]"
                }
              >
                <input type="checkbox" name="entrance" onChange={handlePerks} />
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
                    d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                  />
                </svg>
                Entrance
              </label>
              <label
                className={
                  "bg-white flex items-center gap-2 px-2 w-full h-[50px]"
                }
              >
                <input type="checkbox" name="tv" onChange={handlePerks} />
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
                    d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>
                TV
              </label>
              <label
                className={
                  "bg-white flex items-center gap-2 px-2 w-full h-[50px]"
                }
              >
                <input type="checkbox" name="kitchen" onChange={handlePerks} />
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
                    d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z"
                  />
                </svg>
                Kitchen
              </label>
              <label
                className={
                  "bg-white flex items-center gap-2 px-2 w-full h-[50px]"
                }
              >
                <input type="checkbox" name="pets" onChange={handlePerks} />
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
                    d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                  />
                </svg>
                Pets
              </label>
            </div>
            <div className="my-4">
              <label className="text-[24px] mt-2 " htmlFor="description">
                Checkin And CheckOut
              </label>
              <div className="grid grid-cols-3 gap-2">
                <label className="text-[16px] flex flex-col ">
                  Checkin
                  <input
                    className="pt-1 pb-2 rounded-3xl text-xl px-4 shadow-sm"
                    type="text"
                    name="checkin"
                    id="checkin"
                    placeholder="18:00"
                    onChange={(e) => setCheckIn(e.target.value)}
                    required
                  />
                </label>
                <label className="text-[16px] flex flex-col ">
                  CheckOut
                  <input
                    className="pt-1 pb-2 rounded-3xl text-xl px-4 shadow-sm"
                    type="text"
                    name="checkout"
                    id="checkout"
                    placeholder="9:00"
                    onChange={(e) => setCheckout(e.target.value)}
                    required
                  />
                </label>
                <label className="text-[16px] flex flex-col ">
                  Guests
                  <input
                    className="pt-1 pb-2 rounded-3xl text-xl px-4 shadow-sm"
                    type="text"
                    name="guestsno"
                    id="guestsno"
                    placeholder="2"
                    onChange={(e) => setMaxGuests(e.target.value)}
                    required
                  />
                </label>
              </div>
            </div>
            <div>
              <label className="text-[24px]">Extra Info</label>
              <textarea
                className="pt-1 pb-2 rounded-3xl text-xl px-4 w-full h-[100px] shadow-sm"
                type="text"
                name="extra"
                id="extra"
                placeholder="Enter the extra information here"
                onChange={(e) => setExtraInfo(e.target.value)}
                required
              ></textarea>
            </div>
            <button
              onClick={handleSubmit}
              className="rounded-3xl bg-red-500 text-white w-full my-2 pt-2 pb-2 "
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlacesForm;
