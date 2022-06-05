import { User } from "src/entity/user";
import {
  getCard,
  getCards,
  getUser,
  getUsers,
  postCard,
  postUser,
  putCard,
} from "../repository";

const { pipeline } = require("stream/promises");

export const Resolvers = {
  Query: {
    users: async () => {
      const data = await getUsers().then((res) => res);
      return data;
    },
    user: async (_: any, agrs: any) => {
      const data = await getUser(agrs.id).then((res) => res);
      return data;
    },
    card: async (_: any, agrs: any) => {
      const data = await getCard(agrs.id)?.then((res) => res);
      return data;
    },
    cards: async () => {
      const data = await getCards()?.then((res) => res);
      return data;
    },
  },
  Mutation: {
    createUser: async (_: any, input: User) => {
      const user = await postUser(input);
      return user;
    },
    createCard: async (_: any, input: any) => {
      const card = await postCard(input);
      return card;
    },
    editCard: async (_: any, input: any) => {
      const card = await putCard(input);
      return card;
    },
    singleUpload: async (_: any, { file }: any) => {
      console.log("step-1 :>> ", file);
      const { createReadStream, filename, mimetype, encoding } = await file;
      const stream = createReadStream();
      const out = require("fs").createWriteStream("local-file-output.txt");
      stream.pipe(out);
      await pipeline(out);

      return { filename, mimetype, encoding };
    },
  },
};
