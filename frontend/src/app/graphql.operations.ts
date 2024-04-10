import { gql } from "apollo-angular";


const GET_CARS = gql`
  query{
    cars {
      _id
      image
      name
    }
  }
`
const GET_CAR_BY_ID = gql`
  query($carId: ID!){
  car(id: $carId) {
    _id
    image
    name
  }
}
`
const CREATE_CAR = gql` 
  mutation($data: CarInput!){
  createCar(data: $data) {
    _id
    image
    name
  }
}
`
const UPDATE_CAR = gql`
mutation($updateCarId: ID!, $data: CarInput!){
  updateCar(id: $updateCarId, data: $data) {
    _id
    image
    name
  }
}
`
const DELETE_CAR = gql`
  mutation($deleteCarId: ID!){
  deleteCar(id: $deleteCarId)
}
`


export { GET_CARS, GET_CAR_BY_ID, CREATE_CAR, UPDATE_CAR, DELETE_CAR }