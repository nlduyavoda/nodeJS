require("dotenv").config();
import "reflect-metadata";
// import { createConnection } from "typeorm";
// import Env from "./config/emvironment";
// import { Card } from "./entity/card";
// import { User } from "./entity/user";
import path from "path";
var cors = require("cors");
const fs = require("fs");

type Card = {
  name: string;
  description: string;
  image: string;
};

const MockCard = "src/assets/mockData/card.json";

export const generateID = (card: Card) => {
  const randomNumber = Math.floor(Math.random() * 100) + 10;
  const newCard = { id: randomNumber, ...card };
  return newCard;
};

export const postCardToFile = async (content: Card, path: string) => {
  const newCard = generateID(content);
  const data = await getCardFromFile();
  const newCards = [newCard, ...data.card];
  console.log("newCard :>> ", newCards);

  // data.map((item: any, idx: number) => {
  //   console.log("item :>> ", item);
  // });

  fs.writeFile(path, newCards, (err: any) => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });
};

export const getCardFromFile = async () => {
  // var content;
  const data = await fs.readFileSync(
    MockCard,
    "utf8",
    function read(err: any, data: any) {
      if (err) {
        throw err;
      }
      return data;
    }
  );
  console.log("JSON.parse(data) :>> ", JSON.parse(data));
  return JSON.parse(data);
};

const main = async () => {
  // await createConnection({
  //   type: "postgres",
  //   database: "cards",
  //   username: Env.DB_USERNAME_DEV,
  //   password: Env.DB_PASSWORD_DEV,
  //   logging: true,
  //   synchronize: true,
  //   port: 3001,
  //   entities: [User, Card],
  // });
  const port = 8000;
  const express = require("express");
  const app = express();
  app.use(cors());

  // const card = {
  //   id: 1,
  //   name: "Tony Stark",
  //   description:
  //     "Iron Man is a superhero appearing in American comic books published by Marvel Comics. The character was co-created by writer and editor Stan Lee, developed by scripter Larry Lieber, and designed by artists Don Heck and Jack Kirby",
  //   image: "http://localhost:8000/ironman.png",
  // };

  // const card__edited = {
  //   name: "edited man",
  //   description: "Iron Man is a superhero",
  //   image: "http://localhost:8000/ironman.png",
  // };

  app.get("/ironman.png", function (request: any, response: any) {
    if (request.url === "/ironman.png") {
      response.sendFile(
        path.join(__dirname, "../src/assets/images", "ironman.png")
      );
    } else {
      response.status(401).send("Authorization required!");
    }
  });

  app.post("/", async (request: any, response: any) => {
    const buffers = [];

    for await (const chunk of request) {
      buffers.push(chunk);
    }

    const data = Buffer.concat(buffers).toString();

    response.status(200).send(JSON.stringify(data));
  });

  app.put("/:slug", async (request: any, response: any) => {
    const slug = request.params.slug;
    console.log("slug :>> ", slug);
    const buffers = [];

    for await (const chunk of request) {
      buffers.push(chunk);
    }
    const data = Buffer.concat(buffers).toString();
    response.status(200).send(JSON.stringify(data));
  });

  app.get("/", async (request: any, response: any) => {
    // const jsonCard = await getCardFromFile();
    // if (request.url === "/") {
    //   response.status(200).send({
    //     card: jsonCard,
    //   });
    // }
    console.log(request.url);
    const content = {
      name: "Tony Stark",
      description:
        "Iron Man is a superhero appearing in American comic books published by Marvel Comics. The character was co-created by writer and editor Stan Lee, developed by scripter Larry Lieber, and designed by artists Don Heck and Jack Kirby",
      image: "http://localhost:8000/ironman.png",
    };
    postCardToFile(content, MockCard);
    response.send({ status: "okie" });
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

main().catch((err) => {
  console.log(err);
});
