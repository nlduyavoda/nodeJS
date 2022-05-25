require("dotenv").config();
import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import { createConnection } from "typeorm";
import Env from "./config/emvironment";
import { Card } from "./entity/card";
import { User } from "./entity/user";
import { Resolvers } from "./graphql/Resolvers";
import { TypeDefs } from "./graphql/typeDefs";

const main = async () => {
  await createConnection({
    type: "postgres",
    database: "cards",
    username: Env.DB_USERNAME_DEV,
    password: Env.DB_PASSWORD_DEV,
    logging: true,
    synchronize: true,
    port: 3001,
    entities: [User, Card],
  });

  const apolloServer = new ApolloServer({
    typeDefs: TypeDefs,
    resolvers: Resolvers,
  });

  const port = process.env.PORT || 3000;

  apolloServer.listen(port, () => {
    console.log(`server is listenning on port ${port}`);
  });
};

main().catch((err) => {
  console.log(err);
});
