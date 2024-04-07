import mongoose from "mongoose"

const CarSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  image: String,
})

const Car = mongoose.model('Car', CarSchema);

export default Car;


