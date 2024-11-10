import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

import { catchError, debounceTime, map, Observable, of, switchMap, take } from 'rxjs';

import { ENV_CONFIG } from '@app-core/configs';
import { TodoPost } from '@app-shared/interfaces';

export const checkTitleAsync = (): AsyncValidatorFn => {
  const http = inject(HttpClient);
  const env = inject(ENV_CONFIG);

  return (
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return control.valueChanges.pipe(
      take(1),
      debounceTime(300),
      switchMap((value) => {
        if (!control.dirty) {
          return of(null);
        }
        return http.get<TodoPost>(`${env.jsonApiUrl}/1`).pipe(
          take(1),
          map((todo) => (todo.title === value ? null : { noMatch: 'Title no match' })),
          catchError(() => of({ noMatch: true }))
        );
      })
    );
  };
};
