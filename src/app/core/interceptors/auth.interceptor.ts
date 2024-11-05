import { HttpInterceptorFn } from '@angular/common/http';
import { of, switchMap, take } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const testToken = of('Demo Token');

  return testToken.pipe(
    take(1),
    switchMap((token) => {
      if (!token) {
        return next(req);
      }

      const authRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer UwU`)
      });

      return next(authRequest);
    })
  );
};
