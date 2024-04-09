import { Injectable } from '@angular/core';
import { CREATE_CAR, DELETE_CAR, UPDATE_CAR, UPLOAD_IMAGE } from '../graphql.operations';
import { Apollo } from 'apollo-angular';
import { ICar } from '../interfaces/ICar';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private apollo: Apollo) { }

  async createCar(data: { name: string, image: string }) {
    this.apollo.mutate<any>({
      mutation: CREATE_CAR,
      variables: {
        data
      }
    }).subscribe({
      next: ({ data }: any) => {
        return data
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }
  async updateCar(updateCarId: string, data: { name: string }) {
    this.apollo.mutate({
      mutation: UPDATE_CAR,
      variables: {
        updateCarId,
        data
      }
    }).subscribe({
      next: ({ data }: any) => {
        return data
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }
  async deleteCar(deleteCarId: string): Promise<void> {

    this.apollo.mutate<void>({
      mutation: DELETE_CAR,
      variables: {
        deleteCarId
      }
    }).subscribe({
      next: ({ data }: any) => {
        return data
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

  async uploadImage(file: any) {
    this.apollo.mutate<any>({
      mutation: UPLOAD_IMAGE,
      variables: {
        file
      }
    }).subscribe({
      next: ({ data }: any) => {
        return data
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }
}
