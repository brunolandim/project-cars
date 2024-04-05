import { ApolloServer } from 'apollo-server'
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'
import { connection } from './config/config'

const server = new ApolloServer({ typeDefs, resolvers })

connection()

server.listen().then(({ url }) => console.log(`Servidor rodando ${url}`))