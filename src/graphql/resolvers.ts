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
    uploads: (_: any, args: any) => {},
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
    singleUpload: (_: any, { file }: any) => {
      console.log("xxx :>> ");
      const fileData = dataURLtoFile(file, "hello.txt");
      console.log("fileData :>> ", fileData);
      return fileData;
    },
  },
};
function dataURLtoFile(dataurl: any, filename: string) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
