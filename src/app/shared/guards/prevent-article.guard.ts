import { CanDeactivateFn } from '@angular/router';

export const preventArticleGuard: CanDeactivateFn<unknown> = () => {
  const canLeave = false;
  if (!canLeave) {
    console.error("You can't leave");
    return false;
  }
  return true;
};
