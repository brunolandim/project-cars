import { Component, Input } from '@angular/core';
import { ICar } from '../../interfaces/ICar';
import { CarService } from '../../services/car.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  providers: [CarService],
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() car = {} as ICar; // Recebe o objeto carro como entrada

  constructor(private carService: CarService) { }

  toggleEditMode(): void {
    this.car.editMode = !this.car.editMode;
  }

  async saveCar(id: string, data: { name: string, image: string }) {
    const { name } = data
    await this.carService.updateCar(id, { name })
    this.toggleEditMode();
  }

  cancelEdit(): void {
    this.toggleEditMode();
  }

  async deleteCar(id: string) {
    await this.carService.deleteCar(id)
  }
}
