import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { environment } from '@app-environments/environment';
import { routes } from './app/app.routes';
import { providePageTitleStrategy, provideEnvironment } from '@app-core/configs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(), withInterceptors([])),
    provideRouter(routes),
    provideEnvironment(environment),
    providePageTitleStrategy()
  ]
};
