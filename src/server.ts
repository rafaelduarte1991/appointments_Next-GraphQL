import { ApolloServer } from "apollo-server"
import { buildSchema } from "type-graphql";
import "reflect-metadata"
import { appointmentsResolver } from "./resolver/appointments-resolver";
import path from 'node:path';
import { customerResolver } from "./resolver/customers-resolver";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [appointmentsResolver, customerResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql')
  });

  const server = new ApolloServer({
    schema
  });

  const { url } = await server.listen();
  console.log(`server is running on ${url}`);
}

bootstrap()