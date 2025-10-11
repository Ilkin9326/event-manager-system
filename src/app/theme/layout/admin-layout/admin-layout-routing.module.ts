import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from '@app/demo/dashboard/default/default.component';
import TypographyComponent from '../../../demo/elements/typography/typography.component';
import ElementColorComponent from '../../../demo/elements/element-color/element-color.component';
import { EventCategoryComponent } from '@app/pages/event-category/event-category.component';
import { RolesComponent } from '@app/pages/roles/roles.component';
import { UsersComponent } from '@app/pages/users/users.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component:DefaultComponent

      },
      {
        path: 'ev-cat',
        component: TypographyComponent
      },
      {
        path: 'color',
        component:ElementColorComponent
      },
      {
        path: 'users',
        component:UsersComponent
      },
      {
        path: 'category',
        component:EventCategoryComponent

      },
      {
        path: 'roles',
        component:RolesComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminLayoutRoutingModule {

}
