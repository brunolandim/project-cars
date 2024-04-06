import CarService from '../../../services/CarService'
import { GraphQLUpload } from 'graphql-upload-ts'

export default {
  Upload: GraphQLUpload,
  Query: {
    cars: async () => await CarService.getCars(),
    car: async (_: any, { id }: any) => await CarService.getCarById(id)
  },
  Mutation: {
    createCar: async (_: any, { data }: any) => await CarService.createCar(data),
    updateCar: async (_: any, { id, data }: any) => await CarService.updateCar(id, data),
    deleteCar: async (_: any, { id }: any) => !!(await CarService.deleteCar(id)),
    singleUpload: async (__parent: any, args: any) => await args.file.then((file: any) => file)
  }
}