// Angular import
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-guest',
  imports: [RouterModule],
  templateUrl: './auth.component.html',
  standalone: true,
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {}
