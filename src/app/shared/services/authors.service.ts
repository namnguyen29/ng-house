import { Injectable } from '@angular/core';

import { of, delay, map, Observable, Subject, BehaviorSubject } from 'rxjs';

import { Author } from '@app-shared/interfaces';

const dumpData: Author[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    gender: 'Male',
    ipAddress: '192.168.1.1'
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    gender: 'Female',
    ipAddress: '192.168.1.2'
  },
  {
    id: 3,
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@example.com',
    gender: 'Male',
    ipAddress: '192.168.1.3'
  },
  {
    id: 4,
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@example.com',
    gender: 'Female',
    ipAddress: '192.168.1.4'
  },
  {
    id: 5,
    firstName: 'David',
    lastName: 'Brown',
    email: 'david.brown@example.com',
    gender: 'Male',
    ipAddress: '192.168.1.5'
  }
];

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private readonly _mySignal = new Subject<number>();
  private readonly _beSignal = new BehaviorSubject(0);
  public mySignal = this._mySignal.asObservable();
  public beSignal = this._beSignal.asObservable();
  public readonly authors = dumpData;

  public emitSignalValue(): void {
    this._mySignal.next(100);
    this._mySignal.next(200);
  }

  public emitBeSignalValue(): void {
    this._beSignal.next(400);
    this._beSignal.next(600);
  }

  public getAuthors(param: string | null): Observable<Author[]> {
    return of(this.authors).pipe(
      delay(1000),
      map((authors) =>
        authors.filter((author) =>
          !param
            ? true
            : author.firstName.toLowerCase().startsWith(param.toLowerCase()) ||
              author.lastName.toLowerCase().startsWith(param.toLowerCase())
        )
      )
    );
  }
}
