import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('user')) {
    return true;
  }
  else {
    const router = inject(Router);
    return router.navigate(['/']);
  }
};
