const express = require("express");
const {
  loginSchema,
  registerSchema,
  placesSchema,
  bookingSchema,
} = require("./types");
const cors = require("cors");
const { User, Place, Booking } = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const download = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

const { verifyToken } = require("./middleware");

const app = express();
require("dotenv").config();

app.use("/uploads", express.static(__dirname + `\\uploads`));
app.use(express.json());
app.use(cors());

console.log(process.env.name);
// console.log(process.env);

app.post("/login", async (req, res) => {
  const payload = req.body;
  const parsedPayload = loginSchema.safeParse(payload);

  const { username, password } = parsedPayload.data;

  if (parsedPayload.success) {
    const user = await User.findOne({ username });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        jwt.sign(
          { username, id: user._id },
          process.env.JWT_SECRET,
          (err, token) => {
            if (err) throw err;
            res.json({ msg: "login success", token, user: user });
          }
        );
      } else {
        console.log("Password is wrong ");
        res.status(401).json({ msg: "login failed" });
      }
    }
  } else {
    res.json({ msg: "login failed" });
  }
});

app.post("/register", async (req, res) => {
  const payload = req.body;
  const parsedPayload = registerSchema.safeParse(payload);
  const { username, password, fullname } = parsedPayload.data;

  const hashedPassword = await bcrypt.hash(password, 10);
  parsedPayload.data.password = hashedPassword;

  if (parsedPayload.success) {
    const user = await User.create(parsedPayload.data);
    res.json({ msg: "register success" });
  } else {
    res.json({ msg: "register failed" });
  }
});

app.post("/profile", async (req, res) => {
  const { token } = req.body;
  try {
    const { username } = jwt.verify(token, process.env.JWT_SECRET);
    console.log(username);
    const user = await User.findOne({ username });
    console.log(user);
    res.json({ user: user });
  } catch (err) {
    res.json({ msg: "Error in the profile route" });
  }
});

app.post("/uploadImage", (req, res) => {
  try {
    const { link } = req.body;

    console.log(link);
    console.log(__dirname);

    const newLink = "photo" + Date.now() + ".jpg";
    console.log(newLink);
    download
      .image({
        url: link,
        dest: __dirname + `\\uploads\\` + newLink,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      })
      .then(() => {
        res.json({
          msg: "image uploaded",
          filename: newLink,
        });
      });
  } catch (err) {
    console.log("Error in the upload image route", err);
    res.json({ msg: "Error in the upload image route" });
  }
});

const photoMiddleware = multer({ dest: "uploads/" });

app.post("/upload", photoMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const data = originalname.split(".");
    const ext = data[data.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads\\", ""));
  }
  res.json(uploadedFiles);
});

app.post("/places/:id?", verifyToken, async (req, res) => {
  console.log("----------------------------" + req.params.id);
  if (!req.params.id) {
    const payload = req.body;
    const parsedPayload = placesSchema.safeParse(payload);

    if (parsedPayload.success) {
      const {
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkout,
        maxGuests,
      } = parsedPayload.data;

      const newPlace = {
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkout,
        maxGuests,
        owner: req.id,
      };
      const data = await Place.create(newPlace);
      console.log("------------------------------");
      console.log(data);
      res.json({ msg: "places added" });
    } else {
      res.json({ msg: "places not added" });
    }
  } else {
    const placeData = await Place.findOne({ _id: req.params.id });
    console.log(placeData);
    res.json({ placeData: placeData });
  }
});

app.put("/places/:id", verifyToken, async (req, res) => {
  const payload = req.body;
  const parsedPayload = placesSchema.safeParse(payload);

  if (parsedPayload.success) {
    await Place.updateOne({ _id: req.params.id }, parsedPayload.data);
    res.json({ msg: "places updated" });
  } else {
    res.json({ msg: "places not updated" });
  }
});

app.get("/userPlacesData", verifyToken, async (req, res) => {
  console.log(req.id);
  const data = await Place.find({ owner: req.id });
  res.json({ userData: data });
});

app.get("/data", async (req, res) => {
  const placesData = await Place.find();
  res.json({ placesData });
});

app.get("/listedPlace/:id", async (req, res) => {
  const response = await Place.findOne({ _id: req.params.id });
  console.log(response);
  res.json({ listedPlace: response });
});

app.post("/bookings/:id", verifyToken, async (req, res) => {
  const response = await Place.findOne({ _id: req.params.id });

  if (!response) {
    res.json({ msg: "Invalid Booking for places" });
  } else {
    const payload = req.body;

    console.log(payload);

    // const parsedPayload = bookingSchema.safeParse(payload);

    // console.log("111111111111111111111111111111");
    // console.log(parsedPayload);

    if (payload) {
      const { checkIn, checkOut, numGuests, userName, email, phone, price } =
        payload;

      await Booking.create({
        place: req.params.id,
        checkIn,
        checkOut,
        numGuests,
        userName,
        email,
        phone,
        price,
      });
      res.json({ msg: "booking success" });
    } else {
      res.json({ msg: "Error occured" });
    }
  }
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
