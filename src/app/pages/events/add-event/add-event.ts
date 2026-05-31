import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { SharedModule } from '@app/theme/shared/shared.module';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VenueDto } from '@app/dto/venue-dto';
import { EventVenueService } from '@app/services/event/event-venue.service';
import { ItSupportSelector, SelectedItItem } from '@app/shared/components/it-support-selector/it-support-selector';
import { EventService } from '@app/services/event/event.service';
import { EventDto } from '@app/dto/EventDto';

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [FormsModule, SharedModule, ItSupportSelector],
  templateUrl: './add-event.html',
  styleUrl: './add-event.scss'
})
export class AddEvent implements OnInit {

  @Input() newEvent: any = { title: '', start: '', end: '' };
  @Output() saveEvent = new EventEmitter<any>();

  private fb           = inject(FormBuilder);
  private eventService = inject(EventService);
  eventVenueServis     = inject(EventVenueService);

  venues: VenueDto[]            = [];
  selectedItItems: SelectedItItem[] = [];
  isSaving = false;

  constructor(public activeModal: NgbActiveModal) {}

  eventForm: FormGroup = this.fb.group({
    titleAz:           ['', Validators.required],
    titleEn:           [''],
    titleRu:           [''],
    vId:               [null, Validators.required],
    startTime:         ['', Validators.required],
    endTime:           [''],
    expectedAttendees: [0],
    descAz:            [''],
    descEn:            [''],
    isOnline:          [false],
    hasPoster:         [false],
    rectorAttendance:  [false]
  });

  ngOnInit(): void {
    if (this.newEvent?.start) {
      this.eventForm.patchValue({
        start_time: this.formatForDatetimeLocal(this.newEvent.start),
        end_time:   this.newEvent.end ? this.formatForDatetimeLocal(this.newEvent.end) : ''
      });
    }
    this.eventVenueServis.getAllEventVenues();
  }

  onItSelectionChange(items: SelectedItItem[]): void {
    this.selectedItItems = items;
  }

  // Draft — status: 1, validation tələb olunmur
  saveDraft(): void {
    if (this.isSaving) return;
    this.isSaving = true;
    console.log('vId dəyəri:', this.eventForm.get('vId')?.value);
    console.log('vId tipi:', typeof this.eventForm.get('vId')?.value);
    const form = this.eventForm.value;
    const payload = {
      ...form,
      startTime: form.startTime ? form.startTime + ':00' : null,
      endTime:   form.endTime   ? form.endTime   + ':00' : null,
      empId:     this.getEmpId(),
      status:    1,
      itSupportItems: this.selectedItItems.map(i => ({
        isiId: i.isi_d, quantity: i.quantity ?? 1
      }))
    };

    console.log('Göndərilən payload:', JSON.stringify(payload));

    this.eventService.saveDraft(payload).subscribe({
      next: (res) => {
        this.isSaving = false;
        this.saveEvent.emit(res);
        this.activeModal.close('draft');
      },
      error: (err) => {
        //this.toaster.error('Draft saxlanmadı');
        console.log('xeta oldu')
        this.isSaving = false;
      }
    });
  }

  // Confirmed — status: 2, validation tələb olunur
  // Bu metodu AddEvent komponentinə əlavə et
  onSubmit(): void {
    if (this.eventForm.invalid || this.isSaving) return;
    this.isSaving = true;

    const form = this.eventForm.value;
    const payload = {
      ...form,
      startTime: form.startTime ? form.startTime + ':00' : null,
      endTime:   form.endTime   ? form.endTime   + ':00' : null,
      empId:     null,
      status:    2,
      itSupportItems: this.selectedItItems.map(i => ({
        isiId: i.isi_d, quantity: i.quantity ?? 1
      }))
    };

    this.eventService.saveNewEvent(payload).subscribe({
      next: (res) => { this.isSaving = false; this.saveEvent.emit(res); this.activeModal.close('saved'); },
      error: ()   => { this.isSaving = false; }
    });
  }

  private formatForDatetimeLocal(dateStr: string): string {
    if (dateStr.includes('T')) return dateStr.substring(0, 16);
    return dateStr + 'T00:00';
  }

  private getEmpId(): number | null {
    const user = localStorage.getItem('user');
    if (!user) return null;
    const parsed = JSON.parse(user);
    return parsed.emp_id ?? null;
  }
}
