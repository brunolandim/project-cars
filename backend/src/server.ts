import { ApolloServer } from 'apollo-server-express'
import { graphqlUploadExpress } from 'graphql-upload-ts';
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'
import { connection, firebaseConfig } from './config/config'
import express from 'express'
import path from 'path';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



const app = express()

app.use(graphqlUploadExpress());

async function startServer() {

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: false,
    cache: 'bounded',
  });

  await server.start();

  const app = express();

  server.applyMiddleware({ app });

  app.use(graphqlUploadExpress());

  const firebase = initializeApp(firebaseConfig);
  getAnalytics(firebase);

  const UPLOADS_FOLDER = path.join(__dirname, 'uploads');
  app.use('/uploads', express.static(UPLOADS_FOLDER));

  await connection()

  await new Promise(() => app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)));

}
startServer();