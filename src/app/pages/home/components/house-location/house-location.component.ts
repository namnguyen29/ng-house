import { Component, Input } from '@angular/core';
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
  @Input() public housingLocation!: HousingLocation;
}
