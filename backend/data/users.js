import bcrypt from "bcryptjs";

const users = [
  {
    name: "admin",
    email: "admin@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "arun",
    email: "arun@email.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "user",
    email: "user@email.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
