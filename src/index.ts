import * as Express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import "reflect-metadata";
import { BookResolver } from "./resolvers/BookResolver";
import { UserResolver } from "./resolvers/UserResolver";
import * as path from "path";
import { authChecker } from "./middleware/auth/authChecker";
const main = async () => {
  // build SDL
  const schema = await buildSchema({
    resolvers: [BookResolver, UserResolver],
    validate: false,
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    authChecker: authChecker,
  });

  const app = Express();
  // apollo server
  const apolloServer = new ApolloServer({
    schema,
    debug: true,
    formatError: (error) => error,
    context: ({ req, res }) => {
      const context = {
        req,
        user: null,
      };
      return context;
    },
  });
  // start apollo server
  await apolloServer.start();
  // middleware
  apolloServer.applyMiddleware({ app, path: "/graphql" });

  // run express server
  app.listen(5000, () => {
    console.log("Server is running on port 4000");
  });
};

main();
