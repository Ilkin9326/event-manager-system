import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpinnerComponent } from './theme/shared/components/spinner/spinner.component';
import LoginComponent from './demo/pages/authentication/login/login.component';
import RegisterComponent from './demo/pages/authentication/register/register.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, SpinnerComponent],

})
export class AppComponent {
  title:string = 'Event Manager System';
}
