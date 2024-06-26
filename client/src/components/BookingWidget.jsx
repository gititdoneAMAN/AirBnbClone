import { differenceInCalendarDays } from "date-fns/differenceInCalendarDays";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../UserContext";
import axios from "axios";

const BookingWidget = ({ listedPlaceData }) => {
  const [dateCheckIn, setDateCheckin] = useState("");
  const [dateCheckout, setDateCheckout] = useState("");
  const [numGuests, setNumGuests] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [nameData, setNameData] = useState("");
  const [emailData, setEmailData] = useState("");
  const [phoneData, setPhoneData] = useState("");
  const navigate = useNavigate();

  const { loggedIn } = useContext(userContext);

  const caluclatePrice = React.useCallback(() => {
    setTotalPrice(
      differenceInCalendarDays(new Date(dateCheckout), new Date(dateCheckIn)) *
        listedPlaceData.price *
        numGuests
    );
  }, [numGuests, dateCheckIn, numGuests, dateCheckout]);

  useEffect(() => {
    caluclatePrice();
  }, [listedPlaceData, numGuests, dateCheckIn, dateCheckout]);

  async function handleSubmit() {
    if (!loggedIn) {
      alert("Please login to continue");
      navigate("/login");
    } else {
      caluclatePrice();
      const response = await axios.post(
        "/bookings/" + listedPlaceData._id,
        {
          checkIn: dateCheckIn,
          checkOut: dateCheckout,
          numGuests,
          userName: nameData,
          email: emailData,
          phone: phoneData,
          price: totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      alert(`${response.msg}`);
      navigate("/account/bookings");
    }
  }

  return (
    <div className="p-3 bg-white w-full  rounded-2xl">
      <h2 className="text-center text-2xl font-semibold">{`$ ${listedPlaceData.price}/per night`}</h2>
      <div className="my-2">
        <div className="flex gap-2 justify-center w-full">
          <label className="flex flex-col gap-1 w-full ">
            CheckIn
            <input
              type="date"
              value={dateCheckIn}
              onChange={(e) => setDateCheckin(e.target.value)}
              className="p-3 bg-gray-200 rounded-3xl w-full"
              required
            />
          </label>
          <label className="flex flex-col gap-1 w-full">
            CheckOut
            <input
              type="date"
              value={dateCheckout}
              onChange={(e) => {
                return setDateCheckout(e.target.value);
              }}
              className="p-3 bg-gray-200 rounded-3xl w-full"
              required
            />
          </label>
        </div>
      </div>
      <div className="flex flex-col">
        <label className="flex flex-col gap-1 ">
          People
          <input
            type="number"
            className="p-3 bg-gray-200 rounded-3xl w-full"
            value={numGuests}
            onChange={(e) => setNumGuests(e.target.value)}
            placeholder="2"
            required
            min={0}
            max={10}
          />
        </label>
        {dateCheckIn && dateCheckout && (
          <div>
            <label className="flex flex-col gap-1 w-full">
              Name
              <input
                type="text"
                value={nameData}
                onChange={(e) => setNameData(e.target.value)}
                className="p-3 bg-gray-200 rounded-3xl w-full"
                required
                placeholder="John Doe"
              />
            </label>
            <label className="flex flex-col gap-1 w-full">
              Email
              <input
                type="text"
                value={emailData}
                onChange={(e) => setEmailData(e.target.value)}
                className="p-3 bg-gray-200 rounded-3xl w-full"
                required
                placeholder="john@example.com"
              />
            </label>
            <label className="flex flex-col gap-1 w-full">
              Mobile
              <input
                type="text"
                value={phoneData}
                onChange={(e) => setPhoneData(e.target.value)}
                className="p-3 bg-gray-200 rounded-3xl w-full"
                required
                placeholder="0123456789"
              />
            </label>
          </div>
        )}
      </div>
      {dateCheckout && (
        <span className="text-red-500">{`Book for $${
          listedPlaceData.price *
          numGuests *
          differenceInCalendarDays(
            new Date(dateCheckout),
            new Date(dateCheckIn)
          )
        }`}</span>
      )}
      <button
        onClick={handleSubmit}
        className="bg-red-500 text-white mt-4 w-full p-3 rounded-3xl"
      >
        Book now
      </button>
    </div>
  );
};

export default BookingWidget;
