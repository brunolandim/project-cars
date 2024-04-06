import CarModelGQL from '../graphql/modules/car/resolvers';
const { Mutation, Query } = CarModelGQL
export const getCars = async () => {
  await Query.cars
}

export const getCarById = async () => {
  await Query.car
} 