import { Component, inject, OnInit } from '@angular/core';
import { Route, Router, RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './theme/shared/components/spinner/spinner.component';
import LoginComponent from './demo/pages/authentication/login/login.component';
import RegisterComponent from './demo/pages/authentication/register/register.component';
import { AuthService } from '@app/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent]

})
export class AppComponent implements OnInit {

  title: string = 'Event Manager System';
  route: Router = inject(Router);
  toaster: ToastrService = inject(ToastrService);

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    /*this.authService.checkLogin().subscribe({
      next: (res: boolean) => {
        if(!res)this.route.navigate(['/auth/login'], { replaceUrl: true });
      },
      error: () => {
        this.route.navigate(['/auth/login'], { replaceUrl: true });
      }
    });*/
  }


}
