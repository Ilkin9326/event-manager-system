import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventCategory } from '../../../../../dto/event-category';
import { NgStyle } from '@angular/common';
import { UsersService } from '../../../../../services/user/users.service';
import { UserDto } from '../../../../../dto/user-dto';

@Component({
  selector: 'app-user-modal',
  imports: [
    NgStyle,
    ReactiveFormsModule
  ],
  standalone: true,
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.scss'
})
export class UserModalComponent implements OnInit {

  @Input() textName: string = '';
  displayStyle: string = 'none';
  userGroup!: FormGroup;
  userService: UsersService = inject(UsersService);
  private emp_id: number;
  private name: string;
  private surname: string;
  private email: string;
  btnVisiblityUpdate: boolean = false;
  btnVisiblityAdd: boolean = false;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.userGroup = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(5), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      surname: [null, [Validators.required, Validators.minLength(5), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      email: [null, [Validators.required, Validators.email]]
    });
  }

  postEmployee(): void {
    this.name = this.userGroup.get('name').value;
    this.surname = this.userGroup.get('surname').value;
    this.email = this.userGroup.get('email').value;

    this.userService.postEmployee(this.name.trim(), this.surname.trim(), this.email.trim());
    this.displayStyle = 'none';
    //document.getElementById('closeModal').click();
  }

  onEdit(row: UserDto): void {
    this.emp_id = row['emp_id'];
    this.userGroup.controls['name'].setValue(row.firstname);
    this.userGroup.controls['surname'].setValue(row.lastname);
    this.userGroup.controls['email'].setValue(row.email);

  }


  updateEventCategory() {
    /*  this.name = this.userGroup.get('categoryAz').value;
      this.surname = this.userGroup.get('categoryEn').value;
      this.email = this.userGroup.get('categoryRu').value;
      this.userService.updateEventCategoryById(this.emp_id, this.name, this.surname, this.email);
      this.displayStyle = 'none';
      this.userGroup.reset();*/
  }

  closePopup(): void {
    this.displayStyle = 'none';
  }
}
