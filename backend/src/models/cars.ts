import mongoose from "mongoose"

const { Schema } = mongoose;


const CarSchema = new Schema({
  name: String,
  image: String
})

export const CarModel = mongoose.model('Car', CarSchema)


