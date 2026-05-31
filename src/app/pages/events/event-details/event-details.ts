import { Component, Input, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-details',
  imports: [CommonModule],
  templateUrl: './event-details.html',
  styleUrl: './event-details.scss'
})
export class EventDetails {
  @Input() selectedEvent: any;

  constructor(public activeModal: NgbActiveModal) {}

  deleteEvent() {
    this.activeModal.close('delete');
  }
}
