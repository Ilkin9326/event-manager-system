import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CardComponent } from '@app/theme/shared/components/card/card.component';
import { RolesDto } from '@app/dto/roles-dto';
import { RolesService } from '@app/services/roles/roles.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RoleModalComponent } from './role-modal/role-modal.component';
import { NotificationService } from '@app/services/notification.service';

@Component({
  selector: 'app-roles',
  imports: [
    CardComponent,
    RoleModalComponent
  ],
  standalone: true,
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent implements OnInit {
  @ViewChild(RoleModalComponent) modalComponent: RoleModalComponent;
  roles: RolesDto[] = [];
  roleService: RolesService = inject(RolesService);
  title: string = 'Rollar';
  notificationService: NotificationService = inject(NotificationService);

  ngOnInit(): void {
    this.getAllRoles();
    this.roleService.RefreshRequired.subscribe(res => {
      this.getAllRoles();
    });
  }


  openPopup() {
    this.modalComponent.displayStyle = 'block';
    this.modalComponent.textName = 'Yeni Role';
    this.modalComponent.roleGroup.reset();
    this.modalComponent.btnVisiblityUpdate = false;
    this.modalComponent.btnVisiblityAdd = true;
  }

  updRole(item: RolesDto) {
    this.modalComponent.displayStyle = 'block';
    this.modalComponent.btnVisiblityUpdate = true;
    this.modalComponent.btnVisiblityAdd = false;
    this.modalComponent.textName = 'Role | Dəyişmək';
    this.modalComponent.onEdit(item);
  }

  deleteRole(roleId: number) {
    if (confirm('Seçilən rolu silməkdə əminsiniz?')) this.roleService.deleteRoleById(roleId);
  }

  private getAllRoles(): void {
    this.roleService.getAllRoles().subscribe({
      next: (res: any) => {
        this.roles! = res['response-data'];
      },
      error: (err: HttpErrorResponse) => {
        const errorMsg = err.error?.message || err.statusText || 'Xəta baş verdi';
        this.notificationService.showError(errorMsg);
      }
    });
  }

}
