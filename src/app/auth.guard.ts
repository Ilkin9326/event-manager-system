import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService:AuthService = inject(AuthService);

  authService.userActivated.pipe(
    take(1),
    map((isLoggedIn) =>{
      return isLoggedIn;
    })
  ).subscribe({
    next: (res:boolean)=>{
      if(!res){
        authService.logout();
        return false;
      }
      return true;
    }
  })

  return true;
};
