import {
  Component,
  input
  // effect
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { HousingLocation } from '@app-shared/interfaces';

@Component({
  selector: 'app-house-location',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './house-location.component.html',
  styleUrl: './house-location.component.scss'
})
export class HouseLocationComponent {
  public housingLocation = input.required<HousingLocation>();

  // constructor() {
  //   effect(() => {
  //     console.log('view house input::', this.housingLocation());
  //   });
  // }
}
