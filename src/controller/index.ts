import fs from "fs";
import { Card } from "../type";
import { jsonPath } from "../utils";

export const parseBody = async (request: any) => {
  const buffers = [];

  for await (const chunk of request) {
    buffers.push(chunk);
  }
  const data = Buffer.concat(buffers).toString();
  return JSON.parse(data);
};

export const EditCard = async ({
  id,
  request,
}: {
  id: number;
  request: any;
}) => {
  const body = await parseBody(request);
  const cards = await getCardFromFile(jsonPath);
  const requestCard = { id: +id, ...body.card };
  const newarr = await cards.map((card: Card) => {
    if (requestCard.id === card.id) {
      return {
        ...card,
        name: requestCard.name,
        description: requestCard.description,
      };
    }
    return card;
  });
  const newCards = JSON.stringify(newarr);
  await fs.writeFile(jsonPath, newCards, (err) => {
    console.log(err);
  });
  console.log("newCards :>> ", newCards);
  return JSON.stringify(newCards);
};

export const saveCard = async (path: string, card: any) => {
  const newCard = await cardGenerator(card);
  const oldCards = await getCardFromFile(jsonPath);
  console.log("alexander ------ :>> ", oldCards);
  const newCards = JSON.stringify([newCard, ...oldCards]);
  await fs.writeFile(path, newCards, (err) => {
    console.log(err);
  });
  return JSON.parse(newCards);
};

export const rebaseCard = async (path: string, rebaseData: any) => {
  await fs.writeFile(path, JSON.stringify(rebaseData), (err) => {
    console.log("err :>> ", err);
  });
  return rebaseData;
};

export const cardGenerator = (card: Card) => {
  const id__generator = Math.floor(Math.random() * 100) + 10;
  return {
    id: id__generator,
    name: card.name,
    description: card.description,
    image: card.image,
  };
};

export const getCardFromFile = async (url: string) => {
  // var content;
  const data = await fs.readFileSync(url, "utf8");
  return JSON.parse(data);
};
