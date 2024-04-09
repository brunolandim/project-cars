import Car from "../models/Car";
import { CarType } from "../types/CarType";
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as admin from 'firebase-admin';

class CarService {
  async getCars() {
    return await Car.find();
  }

  async getCarById(id: string) {
    return await Car.findById(id);
  }

  async uploadImage(file: any) {
    console.log(file)
    const { createReadStream, filename, mimetype, encoding } = await file;
    const fileExt = path.extname(filename);
    const uploadedFileName = `${uuidv4()}${fileExt}`;
    const imagePath = path.join(__dirname, `../uploads/${uploadedFileName}`);
    const stream = createReadStream();
    const writeStream = fs.createWriteStream(imagePath);
    await new Promise((resolve, reject) => {
      stream.pipe(writeStream)
        .on('error', reject)
        .on('finish', resolve);
    });
    const newFileName = `${process.env.URL}/${uploadedFileName}`
    return { filename: newFileName, mimetype, encoding };
  }

  private async sendNotification(carInput: CarType) {
    const { name, token } = carInput

    try {
      const message = {
        notification: {
          title: 'Novo carro adicionado!',
          body: `Um novo carro foi adicionado: ${name}`,
        },
        token
      };

      await admin.messaging().send(message);
    } catch (error) {
      console.log(error)
    }

  }

  async createCar(data: CarType) {
    const { name, image } = data;
    if (!name) {
      throw new Error('É necessário passar o nome do veículo')
    }
    const existingCar = await Car.findOne({ name: name });
    if (existingCar) {
      throw new Error('Já existe um carro com esse nome.');
    }
    const carImage = image ? image : process.env.DEFAULT_IMAGE;

    const createdCar = await Car.create({ name, image: carImage });

    this.sendNotification(data)
    return createdCar;
  }

  async updateCar(id: string, data: CarType) {
    const existingCar = await Car.findOne({ name: data.name });
    if (existingCar) {
      throw new Error('Já existe um carro com esse nome.');
    }

    return await Car.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteCar(id: string) {
    return await Car.findByIdAndDelete(id);
  }
}

export default new CarService();
