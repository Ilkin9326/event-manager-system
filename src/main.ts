import { enableProdMode, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';

import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { AdminLayoutModule } from '@app/theme/layout/admin-layout/admin-layout.module';
import { environment } from './environments/environment';

// 🔒 Interceptor-lar
import { jwtInterceptor } from '@app/jwt.interceptor';
import { errorHandlingInterceptor } from '@app/error-handling.interceptor';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule, AdminLayoutModule),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimations(),
    provideToastr(),

    provideHttpClient(
      withInterceptors([
        jwtInterceptor,
        errorHandlingInterceptor
      ])
    ),
  ],
}).catch((err) => console.error(err));
