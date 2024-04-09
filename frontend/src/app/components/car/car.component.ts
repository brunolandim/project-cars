import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { Apollo } from 'apollo-angular';
import { CommonModule } from '@angular/common';
import { ICar } from '../../interfaces/ICar';
import { GET_CARS } from '../../graphql.operations';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, CardComponent],
  providers: [CarService],
  templateUrl: './car.component.html',
  styleUrl: './car.component.scss'
})
export class CarComponent implements OnInit {
  carForm!: FormGroup
  imageUrl: string | ArrayBuffer | null | File = null;
  carList: ICar[] = []
  error = []
  fileToUpload: File | null = null;

  constructor(private apollo: Apollo, private carService: CarService, private cdr: ChangeDetectorRef) {
    this.carForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      image: new FormControl('', []),
    })
  }
  ngOnInit(): void {
    this.apollo.watchQuery({
      query: GET_CARS
    }).valueChanges.subscribe(({ data, error }: any) => {
      this.carList = data.cars.map((car: ICar) => ({ ...car, editMode: false }));
      this.error = error;
    })
  }

  async refetchCarList() {
    try {
      const result: any = this.apollo.query({
        query: GET_CARS
      }).subscribe({
        next: (data) => {

          console.log(data)
        }
      });
      this.carList = result.data.cars;
      this.cdr.detectChanges()
    } catch (error) {
      console.error("Error refetching car list:", error);
    }
  }


  submit(): void {
    /* const formData = new FormData();
     formData.append('file', this.fileToUpload as File);
     const file = formData.get('file')
     console.log(file)
     this.carService.uploadImage(file)*/
    //const {} = this.carForm
    const { name, image } = this.carForm.value
    this.carService.createCar({ name, image })
  }

  onFileSelected(event: any): void {
    this.fileToUpload = event.target.files[0];
  }
}
