import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgStyle } from '@angular/common';
import { RolesService } from '@app/services/roles/roles.service';
import { RolesDto } from '@app/dto/roles-dto';

@Component({
  selector: 'app-role-modal',
  imports: [
    ReactiveFormsModule,
    NgStyle
  ],
  standalone:true,
  templateUrl: './role-modal.component.html',
  styleUrl: './role-modal.component.scss'
})
export class RoleModalComponent implements OnInit{

  @Input() textName: string = '';
  displayStyle: string = 'none';
  roleGroup: FormGroup;
  roleService: RolesService = inject(RolesService);
  private role_id: number;
  private title: string;
  private description: string;

  btnVisiblityUpdate: boolean = false;
  btnVisiblityAdd: boolean = false;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.roleGroup = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(5), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      description: [null, [Validators.required, Validators.minLength(5), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]]
    });
  }

  closePopup() {
    this.displayStyle = 'none';
  }

  onEdit(row: RolesDto): void {
    this.role_id = row['role_id'];
    this.roleGroup.controls['title'].setValue(row.title);
    this.roleGroup.controls['description'].setValue(row.description);

  }

  updateRole() {
    this.title = this.roleGroup.get('title').value;
    this.description = this.roleGroup.get('description').value;
    this.roleService.updateRoleById(this.role_id, this.title, this.description);
    this.displayStyle = 'none';
    this.roleGroup.reset();
  }

  postNewRole() {
    this.title = this.roleGroup.get('title').value;
    this.description = this.roleGroup.get('description').value;

    this.roleService.postNewRole(this.title.trim(), this.description.trim());
    document.getElementById('closeModal').click();
  }
}
