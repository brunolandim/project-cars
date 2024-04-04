import * as dotenv from 'dotenv'
dotenv.config()

export const environmentConfig = {
  PORT: Number(process.env.PORT) || 3000,
  HOST: process.env.DB_HOST || 'localhost',
  DB_NAME: process.env.DB_NAME || 'cars',
  DB_PORT: Number(process.env.DB_PORT) || 27017
}