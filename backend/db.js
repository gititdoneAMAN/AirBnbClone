require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  bookingDetails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
});

const placeSchema = new mongoose.Schema({
  title: String,
  address: String,
  addedPhotos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: String,
  checkout: String,
  maxGuests: Number,
  price: Number,
  bookingDetails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const bookingSchema = mongoose.Schema({
  checkIn: String,
  checkOut: String,
  numGuests: Number,
  userName: String,
  email: String,
  phone: String,
  price: Number,
  place: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Place",
  },
  rentedDetails: [
    {
      renterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      entryDate: String,
      exitDate: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);
const Place = mongoose.model("Place", placeSchema);
const Booking = mongoose.model("Booking", bookingSchema);

module.exports = {
  User,
  Place,
  Booking,
};
