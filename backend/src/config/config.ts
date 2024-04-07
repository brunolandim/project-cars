import * as dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()


export const environmentConfig = {
  PORT: Number(process.env.PORT) || 4000,
  HOST: process.env.DB_HOST || 'localhost',
  DB_NAME: process.env.DB_NAME || 'mongo',
  DB_PORT: Number(process.env.DB_PORT) || 27017
}
const { HOST, DB_PORT, DB_NAME } = environmentConfig

export const connection = async () => {
  try {
    await mongoose.connect(`mongodb://${HOST}:${DB_PORT}/${DB_NAME}`)
  } catch (error) {
    console.log(error)
  }
}

export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};
