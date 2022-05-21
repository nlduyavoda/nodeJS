require("dotenv").config();
import "reflect-metadata";
import express from "express";
import Env from "./config/emvironment";
import { createConnection } from "typeorm";
import { User } from "./entity/index";
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const main = async () => {
  await createConnection({
    type: "postgres",
    database: "cards",
    username: Env.DB_USERNAME_DEV,
    password: Env.DB_PASSWORD_DEV,
    logging: true,
    synchronize: true,
    port: 3001,
    entities: [User],
  });
  const app = express();
  app.use(() => {
    console.log("server is listenning on port 3001");
  });
};
main().catch((err) => {
  console.log(err);
});
