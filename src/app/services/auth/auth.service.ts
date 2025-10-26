import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userActivated = new BehaviorSubject<boolean>(false);
  private api_url = environment.apiUrl;
  private http = inject(HttpClient);
  private router = inject(Router);
  private toaster = inject(ToastrService);

  constructor() {
    if (this.getToken()) {
      this.userActivated.next(true);
    }

  }

  postLogin(email: string, password: string): void {
    const data = { email, password };
    this.http.post(this.api_url+'/api/v1/auth/authenticate', data).subscribe({
      next: (res: any) => {
        if (res.token && res.user) {
          localStorage.setItem('user', JSON.stringify(res.user));
          this.storeToken(res.token);
          this.userActivated.next(true);
          this.toaster.success('Uğurlu giriş edildi');

          this.router.navigate(['/home'], { replaceUrl: true });
        }
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 0) {
          this.toaster.error('Serverə qoşulmaq mümkün olmadı');
        } else if (err.status >= 500) {
          this.toaster.error('Server xətası baş verdi');
        }
        return throwError(() => err);

      }
    });
  }

  logout(): void {
    this.removeToken();
    this.userActivated.next(false);
    this.router.navigate(['/auth/login'], { replaceUrl: true });
  }

  //server seviyyesinde yoxlama
  checkLogin(): Observable<boolean> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });
    return this.http.get<boolean>(`${this.api_url}/api/v1/auth/check-login`, { headers }).pipe(
      tap((isValid) => {
        this.userActivated.next(isValid);

      }),
        catchError(() => {
          this.userActivated.next(false);
          return of(false);
        })
      );
  }


  //lokal seviyyede yoxlayaq, guarda hissede yoxlanilir, performans baximindan lazimdi
  isTokenExpired(token: string): boolean {
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp;
      let res = Date.now() >= expiry * 1000;
      if(res)this.userActivated.next(false);
      return res;
    } catch (e) {
      this.userActivated.next(false);
      return true; // Token parse olunmursa, expired say
    }
  }



  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  private storeToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private removeToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }


}
