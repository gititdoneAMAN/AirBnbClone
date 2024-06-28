import axios from "axios";
import React, { useEffect, useState } from "react";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("/bookingDetails", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBookings(response.data.bookings);
      });
  }, []);

  return (
    <div>
      <h1>Bookings</h1>
    </div>
  );
};

export default Bookings;
