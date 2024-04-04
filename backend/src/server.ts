import { ApolloServer } from 'apollo-server'
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'
import mongoose from 'mongoose'
import { environmentConfig } from './config/config'

const { HOST, DB_PORT, DB_NAME } = environmentConfig
const server = new ApolloServer({ typeDefs, resolvers })
console.log(`mongodb://${HOST}:${DB_PORT}/${DB_NAME}`)
mongoose.connect(`mongodb://${HOST}:${DB_PORT}/${DB_NAME}`, {})

server.listen().then(({ url }) => console.log(`Servidor rodando ${url}`))