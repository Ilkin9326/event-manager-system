import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VenueDto } from '@app/dto/venue-dto';

@Component({
  selector: 'app-shared-modal',
  imports: [CommonModule],
  templateUrl: './shared-modal.component.html',
  styleUrl: './shared-modal.component.css'
})
export class SharedModalComponent {
  @Input() modalTitle: string = '';
  @Input() venueData!: VenueDto;

  // 2. Modalı idarə etmək üçün NgbActiveModal inject edilir
  public activeModal = inject(NgbActiveModal);

}
