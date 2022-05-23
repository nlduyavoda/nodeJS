import { gql } from "apollo-server";
import { User } from "../../entity/index";
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
    type Query {
      books: [Book]
    }
  `;
};

const resolver = {
  Query: {
    books: () => books,
  },
};
console.log("User :>> ", User);
const useGrapgqlBooks = () => {
  return { typeDefsBooks: typeDefs, resolverBooks: resolver };
};

export default useGrapgqlBooks;
