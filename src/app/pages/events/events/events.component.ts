import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { EventDetails } from '@app/pages/events/event-details/event-details';
import { AddEvent } from '@app/pages/events/add-event/add-event';
import { EventService } from '@app/services/event/event.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule, FullCalendarModule, NgbModule, NgScrollbarModule],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {
  @ViewChild('fullcalendar') calendarComponent!: FullCalendarComponent;

  private eventService = inject(EventService);

  selectedEvent: any = null;

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    editable: true,
    selectable: true,
    events: [],
    height: 600,
    select:      this.handleDateSelect.bind(this),
    eventClick:  this.handleEventClick.bind(this)
  };

  constructor(public modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadEvents();

  }

  loadEvents(): void {
    this.eventService.getCalendarEvents().subscribe({
      next: (events) => {
        this.calendarOptions = {
          ...this.calendarOptions,
          events
        };
      },
      error: (err) => console.error('Tədbirlər yüklənmədi:', err)
    });
  }

  handleDateSelect(info: DateSelectArg) {
    const modalRef = this.modalService.open(AddEvent, { size: 'xl', centered: true });

    modalRef.componentInstance.newEvent = {
      title: '',
      start: info.startStr,
      end:   info.endStr
    };

    modalRef.componentInstance.saveEvent.subscribe((eventData: any) => {
      this.addEventToCalendar(eventData);
      modalRef.close();
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    const e = clickInfo.event;

    this.selectedEvent = {
      id:               e.id,
      titleAz:          e.title,
      titleEn:          e.extendedProps['titleEn'],
      titleRu:          e.extendedProps['titleRu'],
      start:            e.startStr,
      end:              e.endStr,
      venueName:        e.extendedProps['venueName'],
      expectedAttendees: e.extendedProps['expectedAttendees'],
      descAz:           e.extendedProps['descAz'],
      descEn:           e.extendedProps['descEn'],
      isOnline:         e.extendedProps['isOnline'],
      hasPoster:        e.extendedProps['hasPoster'],
      rectorAttendance: e.extendedProps['rectorAttendance'],
      status:           e.extendedProps['status'],
    };

    const modalRef = this.modalService.open(EventDetails, { size: 'xl', centered: true });
    modalRef.componentInstance.selectedEvent = this.selectedEvent;

    modalRef.result.then(res => {
      if (res === 'delete') this.deleteEventFromCalendar();
    }).catch(() => {});
  }

  openAddEventModal() {
    const modalRef = this.modalService.open(AddEvent, { size: 'xl', centered: true });
    modalRef.componentInstance.newEvent = { title: '', start: '', end: '' };

    modalRef.componentInstance.saveEvent.subscribe((eventData: any) => {
      this.addEventToCalendar(eventData);
      modalRef.close();
    });
  }

  addEventToCalendar(eventData: any): void {
    const api = this.calendarComponent.getApi();
    api.addEvent({
      id:    String(eventData.eventId ?? Date.now()),
      title: eventData.titleAz,
      start: eventData.startTime,
      end:   eventData.endTime ?? eventData.startTime,
      color: eventData.status === 1 ? '#ffc107' : '#20c997'
    });
  }

  deleteEventFromCalendar(): void {
    const api = this.calendarComponent.getApi();
    const ev  = api.getEventById(this.selectedEvent.id);
    if (ev) ev.remove();
  }
}
