import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';

import { catchError, debounceTime, map, Observable, of, switchMap, take } from 'rxjs';

type DumpTodo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const checkTitleAsync = (http: HttpClient): AsyncValidatorFn => {
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
        return http.get<DumpTodo>('https://jsonplaceholder.typicode.com/todos/1').pipe(
          take(1),
          map((todo) => (todo.title === value ? null : { noMatch: 'Title no match' })),
          catchError(() => of({ noMatch: true }))
        );
      })
    );
  };
};
