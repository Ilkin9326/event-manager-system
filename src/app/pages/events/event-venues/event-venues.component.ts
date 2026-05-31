import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '@app/theme/shared/components/card/card.component';
import { EventVenueService } from '@app/services/event/event-venue.service';
import { NotificationService } from '@app/services/notification.service';
import { VenueDto } from '@app/dto/venue-dto';
import { SharedModalComponent } from '@app/shared/shared-modal/shared-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VenueFormModalComponent } from '@app/pages/events/event-venues/venue-form-modal/venue-form-modal.component';

@Component({
  selector: 'app-event-venues',
  imports: [
    FormsModule,
    CardComponent
  ],
  templateUrl: './event-venues.component.html',
  styleUrl: './event-venues.component.css'
})

export class EventVenuesComponent implements OnInit {
  eventVenueServices: EventVenueService = inject(EventVenueService);
  notificationService: NotificationService = inject(NotificationService);
  title: string = 'Tədbir Məkanları';
  private modalService = inject(NgbModal);

  editMode = false;

  ngOnInit(): void {
    this.eventVenueServices.getAllEventVenues();
    /* this.eventVenueServices.RefreshRequired.subscribe(res => {
       this.getAllRoles();
     });*/
  }

  openViewModal(venue: VenueDto): void {
    const modalRef = this.modalService.open(SharedModalComponent);
    modalRef.componentInstance.venueData = venue;
    modalRef.componentInstance.modalTitle = 'Otaq Xüsusiyyətləri';
  }

  openAdd(): void {
    const modalRef = this.modalService.open(VenueFormModalComponent);
    modalRef.componentInstance.editMode = false;
    modalRef.result.then(this.handleModalResult.bind(this)).catch(() => {});
  }

  // YENİ METOD: Service-dəki POST metodunu çağırır
  private addVenue(venueData: VenueDto): void {
    this.eventVenueServices.postNewVenueInfo(venueData);
  }

  private handleModalResult(venueData: VenueDto): void {
    if (venueData && venueData.v_id) {
      // ID var => UPDATE
      this.updateVenue(venueData);
    } else if (venueData) {
      // ID yoxdur => ADD
      this.addVenue(venueData);
    }
  }

  openEdit(venue: VenueDto) {
    const modalRef = this.modalService.open(VenueFormModalComponent);
    modalRef.componentInstance.editMode = true;
    modalRef.componentInstance.venueData = venue;
    // Burada da eyni handleModalResult metodunu istifadə edirik
    modalRef.result.then(this.handleModalResult.bind(this)).catch(() => {});
  }

  private updateVenue(venueData: VenueDto): void {
    this.eventVenueServices.updateEventVenue(venueData);
  }


  deleteRoom(vId: number) {
    if (confirm('Seçilən otaq silinəcək')) {
      this.eventVenueServices.deleteVenue(vId);
    }
  }

  closeModal() {
    //this.showModal = false;
    const modalEl = document.getElementById('roomModal');
    const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  }
}
