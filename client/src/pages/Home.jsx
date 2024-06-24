import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [value, setValue] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/data").then((response) => {
      console.log(response.data.placesData);
      setValue(response.data.placesData);
    });
  }, []);

  return (
    <div className="m-4">
      <div className="grid grid-cols-3 gap-3 bg-b ">
        {value.map((item, index) => {
          return (
            <div
              onClick={() => navigate(`/places/${item._id}`)}
              className="h-[400px] cursor-pointer bg-white rounded-2xl p-2"
            >
              <div className="w-full h-[325px]">
                <img
                  src={"http://localhost:3000/uploads/" + item.addedPhotos[0]}
                  alt=""
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <h2 className="text-xl font-medium mt-1">{item.title}</h2>
              <p className="text-gray-500">{item.address}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
