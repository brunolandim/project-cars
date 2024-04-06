import Car from "../models/Car";
import { CarType } from "../types/CarType";
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

class CarService {
  async getCars() {
    return await Car.find();
  }

  async getCarById(id: string) {
    return await Car.findById(id);
  }

  private async generatePathImage(image: any) {
    let imagePath = process.env.DEFAULT_IMAGE;
    if (image) {
      const { createReadStream, filename } = await image;
      const fileExt = path.extname(filename);
      const uploadedFileName = `${uuidv4()}${fileExt}`;
      imagePath = path.join(__dirname, `../uploads/${uploadedFileName}`);
      const stream = createReadStream();
      const writeStream = fs.createWriteStream(imagePath);
      await new Promise((resolve, reject) => {
        stream.pipe(writeStream)
          .on('error', reject)
          .on('finish', resolve);
      });
    }
    return imagePath;
  }

  async createCar(data: CarType) {
    const existingCar = await Car.findOne({ name: data.name });
    if (existingCar) {
      throw new Error('Já existe um carro com esse nome.');
    }
    const { name, image } = data
    const imagePath = await this.generatePathImage(image)

    return await Car.create({ name, image: imagePath });
  }

  async updateCar(id: string, data: CarType) {
    return await Car.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteCar(id: string) {
    return await Car.findByIdAndDelete(id);
  }
}

export default new CarService();
