import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();
  const isExpired = authService.isTokenExpired(token);

  if (isExpired) {
    console.log('Token expired → logout');
    authService.logout();
    return of(false);
  }

  return authService.checkLogin().pipe(
    map((isValid) => {
      console.log('checkLogin isValid:', isValid);
      if (!isValid) {
        authService.logout();
        return false;
      }
      return true;
    }),
    catchError((err) => {
      console.log('checkLogin error:', err);
      authService.logout();
      return of(false);
    })
  );
};
