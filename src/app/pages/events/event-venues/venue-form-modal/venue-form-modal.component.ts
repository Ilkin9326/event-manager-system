import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VenueDto } from '@app/dto/venue-dto';
import { BuildingOption } from '@app/dto/building-dto';

@Component({
  selector: 'app-venue-form-modal',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './venue-form-modal.component.html',
  styleUrl: './venue-form-modal.component.css'
})
export class VenueFormModalComponent implements OnInit{
  private fb = inject(FormBuilder);
  public activeModal = inject(NgbActiveModal);

  @Input() editMode: boolean = false;
  @Input() venueData: VenueDto | null = null;

  roomForm!: FormGroup;

  buildingOptions: BuildingOption[] = [
    { id: 1, title: 'Ağ şəhər' },
    { id: 2, title: 'Bibihəybət' }
  ];

  // Özəlliklərin seçimi üçün nümunə
  allFeatures: string[] = ['Proyektor', 'İnternet', 'Kondisioner', 'Laptop', 'Qardirob', 'Səs sistemi'];


  ngOnInit(): void {
    // Formun ilkin dəyərləri
    const featuresArray = this.venueData?.features || [];

    this.roomForm = this.fb.group({
      v_id: [this.venueData?.v_id || null],
      name: [this.venueData?.name || '', Validators.required],

      // bc_id üçün [Validators.required]
      bc_id: [this.venueData?.bc_id || null, Validators.required],

      capacity: [this.venueData?.capacity || 1, [Validators.required, Validators.min(1), Validators.max(800)]],
      floor: [this.venueData?.floor || '', [Validators.required, Validators.minLength(1),  Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],
      notes: [this.venueData?.notes || '', [Validators.required, Validators.minLength(5), Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]],

      // Özəlliklər üçün massiv nəzarəti (FormBuilder istifadə olunur)
      features: [featuresArray, [Validators.required]],
    });
  }

  // Özəlliklər checkbox-dan seçildikdə dəyəri Form'a yazır
  onFeatureChange(event: any): void {
    const selectedFeatures = this.roomForm.get('features')?.value as string[];
    const featureName = event.target.value;

    if (event.target.checked) {
      selectedFeatures.push(featureName);
    } else {
      const index = selectedFeatures.indexOf(featureName);
      if (index > -1) {
        selectedFeatures.splice(index, 1);
      }
    }
    this.roomForm.get('features')?.setValue(selectedFeatures);
  }

  // Özəlliyin seçilib-seçilmədiyini yoxlamaq üçün
  isFeatureSelected(feature: string): boolean {
    const features = this.roomForm.get('features')?.value as string[] | undefined;
    return features ? features.includes(feature) : false;
  }

  saveRoom(): void {
    if (this.roomForm.valid) {
      // Modalı bağlayır və Parent-ə formun dəyərini (data) qaytarır
      this.activeModal.close(this.roomForm.value);
    }
  }
}
