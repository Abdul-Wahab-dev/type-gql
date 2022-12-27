import * as Express from "express";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
import "reflect-metadata";
import { BookResolver } from "./resolvers/BookResolver";
import * as path from "path";
const main = async () => {
  // build SDL
  const schema = await buildSchema({
    resolvers: [BookResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  const app = Express();
  // apollo server
  const apolloServer = new ApolloServer({
    schema,
    debug: true,
    formatError: (error) => error,
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
