// Angular import
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

// third party import
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AuthService } from '../../../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-right',
  imports: [RouterModule, SharedModule, CommonModule],
  templateUrl: './nav-right.component.html',
  standalone: true,
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {

  authServise = inject(AuthService);

  logOut(){
    this.authServise.logout();
  }

}
