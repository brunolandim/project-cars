import mongoose from "mongoose"

const CarSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  image: String,
})

export default mongoose.model('Car', CarSchema)


