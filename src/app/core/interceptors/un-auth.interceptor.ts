import { HttpInterceptorFn, HttpResponse, HttpStatusCode } from '@angular/common/http';

import { catchError, of } from 'rxjs';

export const unAuthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpResponse<Record<string, string>>) => {
      if (error.status === HttpStatusCode.NotFound) {
        console.error('Call Dialog service - Not Found');
      }
      if (error.status === HttpStatusCode.Unauthorized) {
        console.error('Call Dialog service -Un Auth');
      }
      return of(error);
    })
  );
};
