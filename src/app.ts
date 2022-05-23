require("dotenv").config();
import { ApolloServer, gql } from "apollo-server";
import "reflect-metadata";
import { createConnection } from "typeorm";
import Env from "./config/emvironment";
import { User } from "./entity/index";
import { getUser, getDetailUser, inputUser, createUser } from "./test";
const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const typeDefs = () => {
  return gql`
    type Book {
      title: String
      author: String
    }
    type User {
      userName: String
      Email: String
      Password: String
    }
    type Query {
      books: [Book]
      users: [User]
      user(id: ID!): User
    }
    type Mutation {
      postuser(userName: String!, Email: String!, Password: String!): User
    }
  `;
};

const resolvers = {
  Query: {
    books: () => books,
    users: async () => {
      const data = await getUser().then((res) => res);
      return data;
    },
    user: async (parent: any, agrs: any) => {
      console.log("agrs :>> ", agrs.id);
      const data = await getDetailUser(agrs.id).then((res) => res);
      console.log("getDetailUser :>> ", data);
      return data;
    },
  },
  Mutation: {
    postuser: async (_: any, input: User) => {
      const user = await createUser(input);
      return user;
    },
  },
};

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
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const port = process.env.PORT || 3000;

  apolloServer.listen(port, () => {
    console.log(`server is listenning on port ${port}`);
  });
};
main().catch((err) => {
  console.log(err);
});
