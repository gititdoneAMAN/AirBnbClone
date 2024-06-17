const express = require("express");
const { loginSchema, registerSchema } = require("./types");
const cors = require("cors");
const { User } = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
require("dotenv").config();

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
        jwt.sign(username, process.env.JWT_SECRET, (err, token) => {
          if (err) throw err;
          res.json({ msg: "login success", token });
        });
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

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
