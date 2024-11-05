import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { environment } from '@app-environments/environment';
import { provideEnvironment, providePageTitleStrategy } from '@app-core/configs';
import {
  authInterceptor,
  loggingInterceptor,
  unAuthorizedInterceptor
} from '@app-core/interceptors';
import { routes } from './app/app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(
      withFetch(),
      withInterceptors([loggingInterceptor, unAuthorizedInterceptor, authInterceptor])
    ),
    provideRouter(routes),
    provideAnimations(),
    provideEnvironment(environment),
    providePageTitleStrategy()
  ]
};
