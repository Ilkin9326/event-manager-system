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
    authService.logout();
    return of(false);
  }

  // Token lokal olaraq keçərlidir → serverlə sinxronlaş
  return authService.checkLogin().pipe(
    map((isValid) => {
      if (!isValid) {
        authService.logout();
        return false;
      }
      return true;
    }),
    catchError(() => {
      authService.logout();
      return of(false);
    })
  );

};
