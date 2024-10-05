import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { HouseLocationComponent } from './components';
import { HousingService } from '@app-shared/services';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HouseLocationComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly housingService = inject(HousingService);
  public housingLocationList$ = this.housingService.getAllHousingLocations();
  public filteredLocationList$ = this.housingLocationList$;

  public filterResults(text: string): void {
    if (!text) {
      return;
    }
    this.filteredLocationList$ = this.housingLocationList$.pipe(
      map((housingLocationList) => {
        return housingLocationList.filter((housingLocation) =>
          housingLocation.city.toLowerCase().includes(text.toLowerCase())
        );
      })
    );
  }
}
