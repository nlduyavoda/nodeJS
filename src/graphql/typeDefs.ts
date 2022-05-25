import { gql } from "apollo-server-core";

export const TypeDefs = () => {
  return gql`
    type User {
      userName: String
      Email: String
      Password: String
    }
    type Card {
      title: String
      price: Int
      description: String
    }
    type Query {
      users: [User]
      user(id: ID!): User
      cards: [Card]
    }
    type Mutation {
      createUser(userName: String!, Email: String!, Password: String!): User
      createCard(title: String!, price: Int!, description: String!): Card
    }
  `;
};
