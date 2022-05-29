import { gql } from "apollo-server-core";

export const TypeDefs = () => {
  return gql`
    scalar FileUpload
    type File {
      filename: String!
      mimetype: String!
      encoding: String!
    }
    type User {
      id: ID
      userName: String
      Email: String
      Password: String
    }
    type Card {
      id: ID
      title: String
      price: Int
      description: String
      image: String
    }

    type Query {
      users: [User]
      user(id: ID!): User
      card(id: ID!): Card
      cards: [Card]
      uploads: [File]
    }

    type Mutation {
      createUser(userName: String!, Email: String!, Password: String!): User
      createCard(title: String!, price: Int!, description: String!): Card
      editCard(
        id: ID!
        title: String
        price: Int
        description: String
        image: String
      ): Card
      singleUpload(file: FileUpload!): File!
    }
  `;
};
