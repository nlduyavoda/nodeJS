require("dotenv").config();
import "reflect-metadata";
import path from "path";
import { jsonPath } from "./utils";
import cors from "cors";
import fs from "fs";
import {
  EditCard,
  pagination,
  parseBody,
  rebaseCard,
  saveCard,
} from "./controller";
import { rebaseData } from "./assets/mockData/cardDefault";

// const dataToReSet = {
//   card: [
//     {
//       id: 1,
//       name: "Tony Stark",
//       description:
//         "Iron Man is a superhero appearing in American comic books published by Marvel Comics. The character was co-created by writer and editor Stan Lee, developed by scripter Larry Lieber, and designed by artists Don Heck and Jack Kirby",
//       image: "http://localhost:8000/ironman.png",
//     },
//     {
//       id: 74,
//       name: "Tom Hiddleston",
//       description: "He is Lordkies right ???",
//       image:
//         "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Tom_Hiddleston_%2836109110291%29_%28cropped%29.jpg/1200px-Tom_Hiddleston_%2836109110291%29_%28cropped%29.jpg",
//     },
//   ],
// };

export const getCardFromFile = async () => {
  // var content;
  const data = await fs.readFileSync(jsonPath, "utf8");
  return JSON.parse(data);
};
const main = async () => {
  const port = process.env.PORT || 8001
  const express = require('express')
  const app = express()
  app.use(cors())

  app.get('/ironman.png', function (req: any, res: any) {
    if (req.url === '/ironman.png') {
      console.log('okie')
      res.sendFile(path.join(__dirname, '../src/assets/images', 'ironman.png'))
    } else {
      res.status(401).send('Authorization required!')
    }
  })

  app.get('/:slug', async (req: any, res: any) => {
    const currentPage = req.params.slug
    const cards = await pagination(currentPage)
    res.send(cards)
  })

  app.post('/', async (request: any, response: any) => {
    const requestBody = await parseBody(request)
    const input = JSON.parse(requestBody.card)
    if (input) {
      const data = await saveCard(jsonPath, input)
      response.status(200).send({
        data: data,
        status: 'POST SUCCESS'
      })
    }
    if (requestBody.pagin) {
      const data = await saveCard(jsonPath, requestBody.card)
      response.status(200).send({
        data: data,
        status: `POST ${requestBody.pagin} SUCCESS`
      })
    }
    if (requestBody.status) {
      const data = await rebaseCard(jsonPath, rebaseData)
      response.status(200).send({
        data: data,
        status: `POST ${requestBody.status} SUCCESS`
      })
    }
  })

  app.put('/:slug', async (request: any, response: any) => {
    if (!!request.params.slug) {
      const card = await EditCard({
        id: request.params.slug,
        request: request
      })
      response.status(200).send(card)
    } else {
      response.status(401).send('missing card id')
    }
  })

  app.get('/', async (_: any, res: any) => {
    const data = await getCardFromFile()
    res.status(200).send(JSON.stringify(data))
  })

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

main().catch((err) => {
  console.log(err);
});
