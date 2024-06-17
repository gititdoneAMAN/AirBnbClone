const zod = require("zod");

const loginSchema = zod.object({
  username: zod.string({ msg: "username is required" }).min(1),
  password: zod.string({ msg: "password is required" }).min(6),
});

const registerSchema = zod.object({
  username: zod.string({ msg: "username is required" }).min(1),
  password: zod.string({ msg: "password is required" }).min(6),
  fullname: zod.string({ msg: "fullname is required" }).min(1),
});

module.exports = {
  loginSchema,
  registerSchema,
};
