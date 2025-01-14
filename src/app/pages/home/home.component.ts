import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { map } from 'rxjs';

import { HouseLocationComponent } from './components';
import { HousingService } from '@app-shared/services';
import { HighlightDirective } from '@app-shared/directives';

@Component({
    selector: 'app-home',
    imports: [HouseLocationComponent, HighlightDirective, RouterLink, AsyncPipe],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly housingService = inject(HousingService);
  public housingLocationList$ = this.housingService.getAllHousingLocations();
  public filteredLocationList$ = this.housingLocationList$;
  public value = signal(10);

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
