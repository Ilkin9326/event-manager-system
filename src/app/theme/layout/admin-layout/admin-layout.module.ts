import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminLayoutRoutingModule } from './admin-layout-routing.module';
import { AdminComponent } from '@app/theme/layout/admin/admin.component';
import { NavigationComponent } from '@app/theme/layout/admin/navigation/navigation.component';
import { NavBarComponent } from '@app/theme/layout/admin/nav-bar/nav-bar.component';
import { ConfigurationComponent } from '@app/theme/layout/admin/configuration/configuration.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminLayoutRoutingModule,
    AdminComponent,
    NavigationComponent,
    NavBarComponent,
    ConfigurationComponent
  ]
})
export class AdminLayoutModule { }
