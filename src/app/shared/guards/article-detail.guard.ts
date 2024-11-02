import { inject } from '@angular/core';
import {
  CanActivateChildFn,
  // CanActivateFn,
  Router
} from '@angular/router';

/**
 * CanActivateChildFn => Protect only child guard (You can activate to parent route)
 * CanActivateFn => Protect all guard
 */
export const articleDetailGuard: CanActivateChildFn = () => {
  const hasPermission = true;

  if (!hasPermission) {
    console.error("Route error - you don't have permisson");
    inject(Router).navigate(['/']);
    return false;
  }
  return true;
};
