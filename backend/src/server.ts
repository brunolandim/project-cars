import { ApolloServer } from 'apollo-server-express'
import { graphqlUploadExpress } from 'graphql-upload-ts';
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'
import { connection, environmentConfig, firebaseConfig } from './config/config'
import express from 'express'
import path from 'path';
import { initializeApp } from 'firebase-admin/app';
import bodyParser from 'body-parser'

const { PORT } = environmentConfig;

initializeApp(firebaseConfig);

async function startServer() {

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: false,
    cache: 'bounded',
  });

  await server.start();

  const app = express();

  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });


  const UPLOADS_FOLDER = path.join(__dirname, 'uploads');
  app.use('/uploads', express.static(UPLOADS_FOLDER));

  await connection()

  await new Promise(() => app.listen({ port: PORT }, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)));

}
startServer();