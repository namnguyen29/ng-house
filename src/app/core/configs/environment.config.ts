import { InjectionToken, ValueProvider } from '@angular/core';

import { Environment } from '@app-shared/interfaces';

export const ENV_CONFIG = new InjectionToken<Environment>('env.config');

export const provideEnvironment = (value: Environment): ValueProvider => ({
  useValue: value,
  provide: ENV_CONFIG
});
