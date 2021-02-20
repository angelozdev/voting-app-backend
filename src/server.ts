import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";

/* Resolvers */
import { CandidateResolver } from "./graphql/resolvers";

async function startServer() {
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [CandidateResolver],
    }),
  });

  return server;
}

export default startServer;
