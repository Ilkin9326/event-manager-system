import { enableProdMode, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

import { AppComponent } from '@app/app.component';
import { AdminLayoutModule } from '@app/theme/layout/admin-layout/admin-layout.module';
import { environment } from './environments/environment';

// 🔒 Interceptor-lar
import { jwtInterceptor } from '@app/jwt.interceptor';
import { errorHandlingInterceptor } from '@app/error-handling.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from '@app/app.routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AdminLayoutModule),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideToastr(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        jwtInterceptor,
        errorHandlingInterceptor
      ])
    ),
  ],
}).catch((err) => console.error(err));
