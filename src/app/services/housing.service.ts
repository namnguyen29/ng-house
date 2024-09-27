import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { HousingLocation } from '../interfaces/housing-location';
import { ENV_CONFIG } from '../configs/env-config';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  private readonly env = inject(ENV_CONFIG);
  private readonly http = inject(HttpClient);

  public getAllHousingLocations(): Observable<HousingLocation[]> {
    return this.http.get<HousingLocation[]>(this.env.baseUrl);
  }

  public getHousingLocationById(id: number): Observable<HousingLocation | undefined> {
    return this.http
      .get<HousingLocation[]>(`${this.env.baseUrl}`)
      .pipe(map((housingLocation) => housingLocation.find((house) => house.id === id)));
  }

  public submitApplication(firstName: string, lastName: string, email: string): void {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`
    );
  }
}
