import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  const user = localStorage.getItem('currentUser')
  const router= inject(Router)
  if (user) {
    router.navigate(['login'])
    return true;
  }else{
    return false;
  }
};
