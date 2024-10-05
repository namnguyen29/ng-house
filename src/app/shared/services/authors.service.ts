import { Injectable } from '@angular/core';

import { Author } from '@app-shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  public readonly authors: Array<Author> = [
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
}
