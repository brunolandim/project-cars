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
    return { filename: uploadedFileName, mimetype, encoding };
  }

  private async sendNotification(carInput: CarType) {

    const userToken = carInput.phoneNumber; // Recupere o token do usuário do seu banco de dados
    const message = {
      token: userToken,
      notification: {
        title: 'Novo carro adicionado!',
        body: `Um novo carro foi adicionado: ${carInput.name}`,

      },
    };

    // Envie a notificação push para o dispositivo do usuário
    await admin.messaging().send(message);
  }

  async createCar(data: CarType) {

    const existingCar = await Car.findOne({ name: data.name });
    if (existingCar) {
      throw new Error('Já existe um carro com esse nome.');
    }
    const { name } = data;
    let image = data.image ? data.image : process.env.DEFAULT_IMAGE;
    const createdCar = await Car.create({ name, image });
    this.sendNotification(data)
    return createdCar;
  }

  async updateCar(id: string, data: CarType) {
    return await Car.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteCar(id: string) {
    return await Car.findByIdAndDelete(id);
  }
}

export default new CarService();
