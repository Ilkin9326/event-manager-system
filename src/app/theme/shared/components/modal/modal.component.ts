import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventService } from '@app/services/event/event.service';
import { EventCategory } from '@app/dto/event-category';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [
    ReactiveFormsModule,
    NgStyle
  ],
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {

  @Input() textName: string = '';
  displayStyle: string = 'none';
  eventCategory: FormGroup;
  eventService: EventService = inject(EventService);
  private ec_id: number;
  private catAz: string;
  private catEn: string;
  private catRu: string;
  btnVisiblityUpdate: boolean = false;
  btnVisiblityAdd: boolean = false;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.eventCategory = this.fb.group({
      categoryAz: [null, [Validators.required, Validators.minLength(5), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      categoryEn: [null, [Validators.required, Validators.minLength(5), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      categoryRu: [null]
    });
  }

  postEventCategory(): void {
    this.catAz = this.eventCategory.get('categoryAz').value;
    this.catEn = this.eventCategory.get('categoryEn').value;
    this.catRu = this.eventCategory.get('categoryRu').value;

    this.eventService.postEventCategory(this.catAz.trim(), this.catEn.trim(), this.catRu.trim());
    document.getElementById('closeModal').click();
  }

  onEdit(row: EventCategory): void {
    this.ec_id = row['ec_id'];
    this.eventCategory.controls['categoryAz'].setValue(row.title_az);
    this.eventCategory.controls['categoryEn'].setValue(row.title_en);
    this.eventCategory.controls['categoryRu'].setValue(row.title_ru);

  }


  updateEventCategory() {
    this.catAz = this.eventCategory.get('categoryAz').value;
    this.catEn = this.eventCategory.get('categoryEn').value;
    this.catRu = this.eventCategory.get('categoryRu').value;
    this.eventService.updateEventCategoryById(this.ec_id, this.catAz, this.catEn, this.catRu);
    this.displayStyle = 'none';
    this.eventCategory.reset();
  }

  closePopup(): void {
    this.displayStyle = 'none';
  }
}
