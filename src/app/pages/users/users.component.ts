import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { CardComponent } from '@app/theme/shared/components/card/card.component';
import { UserDto } from '@app/dto/user-dto';
import { HttpErrorResponse } from '@angular/common/http';
import { UsersService } from '@app/services/user/users.service';
import { UserModalComponent } from '@app/theme/shared/components/modal/user-modal/user-modal.component';

@Component({
  selector: 'app-users',
  imports: [
    CardComponent,
    UserModalComponent
  ],
  standalone: true,
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit, AfterViewInit {


  @ViewChild(UserModalComponent, { static: false }) modalComponent!:UserModalComponent;
  modalVisible: boolean = false;
  title:string = "Əməkdaşlar"
  users: UserDto[] = [];
  userService:UsersService = inject(UsersService);
  ngAfterViewInit(): void {

  }

  openPopup() {
    this.modalComponent.displayStyle = "block";
    this.modalComponent.textName = "Yeni əməkdaş";
    this.modalComponent.userGroup.reset();
    this.modalComponent.btnVisiblityUpdate = false;
    this.modalComponent.btnVisiblityAdd = true;
  }

  ngOnInit(): void {
    this.getAllEmployee();
    this.userService.RefreshRequired.subscribe(res => {
      this.getAllEmployee();
    });
  }

  private getAllEmployee(): void {
    this.userService.getAllEmployee().subscribe({
      next: (res: any) => {
        this.users = res?.data ?? [];
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.message);
      }
    });
  }

  updEmployee(item: UserDto) {
    this.modalComponent.displayStyle="block";
    this.modalComponent.btnVisiblityUpdate = true;
    this.modalComponent.btnVisiblityAdd = false;
    this.modalComponent.textName = "Əməkdaş | Dəyişmək";
    this.modalComponent.onEdit(item);
  }

  deleteEmpById(emp_id: number) {
    if (confirm('Seçilən əməkdaşı silməkdə əminsiniz?')) this.userService.deleteEmpById(emp_id);
  }
}
