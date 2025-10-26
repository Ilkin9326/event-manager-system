import { Routes } from '@angular/router';
import { AuthComponent } from '@app/theme/layout/guest/auth.component';
import { authGuard } from '@app/auth.guard';

export const routes: Routes = [
  // Guest (auth) routes
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./demo/pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  },

  // Admin routes
  {
    path: '',
    loadChildren: () =>
      import('./theme/layout/admin-layout/admin-layout.module').then(
        (m) => m.AdminLayoutModule
      ),
  },

  // Wildcard fallback
  { path: '**', redirectTo: '' },
];
