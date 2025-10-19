import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userActivated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoggedIn: boolean = false;
  private api_url: string = environment.apiUrl;
  toaster: ToastrService = inject(ToastrService);
  route: Router = inject(Router);

  constructor(private http: HttpClient) {
    console.log('token: ', this.getToken());
    this.userActivated.subscribe({
      next: (res: boolean) => {
        console.log('res auth servise: ', res);
      }
    });

    if (this.getToken() != '') {
      this.userActivated.next(true);
    }

  }

  postLogin(email: string, password: string) {
    const data: { password: string; email: string } =
      {
        email: email,
        password: password
      };
    this.http.post(this.api_url + '/api/v1/auth/authenticate', data, httpOptions)
      .subscribe({
        next: (res: any) => {
          if (res.token != null && res.user != null) {

            localStorage.setItem('user', JSON.stringify(res.user));
            this.isLoggedIn = true;
            this.userActivated.next(true);
            this.storeToken(res.token);

            this.toaster.success('Ugurlu Giris edildi');
            this.route.navigate(['/home'], { replaceUrl: true });
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err.error.detail != null) this.toaster.error(err.error.detail, err.error.title);
          else this.toaster.error(err.message);
        }
      });
  }

  logout() {
    this.removeTokenFromLocalStorage();
    this.userActivated.next(false);
    this.isLoggedIn = false;
    this.route.navigate(['/auth/login'], { replaceUrl: true });
  }

  private storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  private removeTokenFromLocalStorage() {
    localStorage.removeItem('token');
    localStorage.clear();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }


}
