require("dotenv").config();

const Env = {
  DB_USERNAME_DEV: process.env.DB_USERNAME_DEV,
  DB_PASSWORD_DEV: process.env.DB_PASSWORD_DEV,
};
export default Env;
