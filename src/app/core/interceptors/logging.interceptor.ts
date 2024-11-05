import {
  // HttpEventType
  HttpInterceptorFn
} from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap((event) => {
      console.log('logging - event', event);
    })
  );
};
