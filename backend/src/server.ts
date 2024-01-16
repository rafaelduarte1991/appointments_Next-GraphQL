require('dotenv').config();
import { ApolloServer } from "apollo-server"
import { buildSchema } from "type-graphql";
import "reflect-metadata"
import { appointmentsResolver } from "./resolver/appointments-resolver";
import path from 'node:path';
import { customerResolver } from "./resolver/customers-resolver";
const mongoose = require('mongoose');

async function bootstrap() {
  const uri = process.env.MONGODB_URI as string;

  const schema = await buildSchema({
    resolvers: [appointmentsResolver, customerResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql')
  });

  const server = new ApolloServer({
    schema
  });

  mongoose.connect(uri, {useNewUrlParser: true})
  .then(() => {
    console.log("mongoDb connection successful connected");
    return server.listen();
  })
  .then((res:any)=> {
    console.log(`server is running on ${res.url}`);
  })
}

bootstrap()