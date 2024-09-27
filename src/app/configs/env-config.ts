import { InjectionToken, ValueProvider } from '@angular/core';
import { Environment } from '../interfaces/envinronment';

export const ENV_CONFIG = new InjectionToken<Environment>('env.config');

export const getEnvironmentProvider = (value: Environment): ValueProvider => ({
  useValue: value,
  provide: ENV_CONFIG
});
