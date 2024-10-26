import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { getEnvironmentProvider } from '@app-core/configs/environment.config';
import { environment } from '@app-environments/environment';
import { routes } from './app/app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    getEnvironmentProvider(environment),
    provideHttpClient()
  ]
};
