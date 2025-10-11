import { HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

export const errorHandlingInterceptor: HttpInterceptorFn = (req, next) => {
  const authService:AuthService = inject(AuthService);
  const toastr:ToastrService = inject(ToastrService);

  return next(req).pipe(catchError(error =>{
    //console.log('interceptor gelen error', error.status)
    switch(error.status){
      case HttpStatusCode.Unauthorized:
        toastr.error(error.error.detail,error.error.title);
        authService.logout();
        break;
      case HttpStatusCode.InternalServerError:
        toastr.error(error.error.detail,error.error.title);
        break;
      case HttpStatusCode.BadRequest:
        toastr.error(error.error.detail,error.error.title);
        break;
      case HttpStatusCode.MethodNotAllowed:
        toastr.error(error.error.detail,error.error.title);
        break;
      case HttpStatusCode.GatewayTimeout:

        toastr.error(error.error.detail,error.error.title);
        authService.logout();
        break;
      default:
        console.log(error.status+" -> "+error.message)
        toastr.error( error.message,'Unexpected error occured');
        //this.route.navigate(['login']);
        break;

    }
    return of(error);
  }));
};
