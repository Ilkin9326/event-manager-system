import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { catchError, throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authServise:AuthService = inject(AuthService);
  const token = authServise.getToken();
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }


  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        authServise.logout();
      }
      const error = err || err.statusText;
      return throwError(() => error);
    })
  );
};
