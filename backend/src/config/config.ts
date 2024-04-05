import * as dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()


export const environmentConfig = {
  PORT: Number(process.env.PORT) || 3000,
  HOST: process.env.DB_HOST || 'localhost',
  DB_NAME: process.env.DB_NAME || 'mongo',
  DB_PORT: Number(process.env.DB_PORT) || 27017
}
const { HOST, DB_PORT, DB_NAME } = environmentConfig

export const connection = async () => {
  try {
    await mongoose.connect(`mongodb://${HOST}:${DB_PORT}/${DB_NAME}`)
    console.log('Conectou com sucesso')
  } catch (error) {
    console.log(error)
  }
}