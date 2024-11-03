import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import { environment } from '@app-environments/environment';
import { providePageTitleStrategy, provideEnvironment } from './app/configs';
import { routes } from './app/app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(), withInterceptors([])),
    provideRouter(routes),
    provideAnimations(),
    provideEnvironment(environment),
    providePageTitleStrategy()
  ]
};
