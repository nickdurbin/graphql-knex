const { ApolloServer, gql } = require("apollo-server-express");
const express = require("express");

const db = require("./data/dbConfig");
const app = express();

require("dotenv").config();

const port = process.env.PORT;

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    admin: Boolean!
  }
  type Todo {
    id: ID!
    name: String!
    description: String!
    complete: Boolean!
    user: User!
  }
  input AddTodoInput {
    name: String!
    description: String!
    user_id: Int!
  }
  type Query {
    users: [User]!
    user(id: ID!): User!
    todos: [Todo]!
  }
  type Mutation {
    addTodo(data: AddTodoInput!): Todo!
  }
`;

const resolvers = {
  Query: {
    users() {
      return db("users");
    },
    user(_, { id }) {
      return db("users").where({ id }).first();
    },
    todos() {
      return db("todos");
    },
  },
  Mutation: {
    async addTodo(_, { data }) {
      await db("todos").insert(data);
      return db("todos").where({ name: data.name }).first();
    },
  },
  Todo: {
    user(parent) {
      return db("users").where({ id: parent.user_id }).first();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.listen(port, () =>
  console.log(`Server ready on http://localhost:${port}/graphql 🚀`)
);
