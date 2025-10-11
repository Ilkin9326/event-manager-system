import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CardComponent } from '../../theme/shared/components/card/card.component';
import { EventService } from '../../services/event/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { ModalComponent } from '../../theme/shared/components/modal/modal.component';
import { EventCategory } from '../../dto/event-category';


@Component({
  selector: 'app-event-category',
  imports: [
    CardComponent,
    ModalComponent,
    ModalComponent
  ],
  standalone: true,
  templateUrl: './event-category.component.html',
  styleUrl: './event-category.component.scss'
})
export class EventCategoryComponent implements OnInit {
  @ViewChild(ModalComponent) modalComponent:ModalComponent;
  title: string = 'Kateqoriya';
  eventCat: any[] = [];
  eventService: EventService = inject(EventService);

  constructor(private titleService: Title) {
    this.titleService.setTitle('BANM | Event Category');
  }

  openPopup() {
    this.modalComponent.displayStyle = "block";
    this.modalComponent.textName = "Yeni Kateqoriya";
    this.modalComponent.eventCategory.reset();
    this.modalComponent.btnVisiblityUpdate = false;
    this.modalComponent.btnVisiblityAdd = true;
  }


  ngOnInit(): void {
    this.getAllEventCategory();
    this.eventService.RefreshRequired.subscribe(res => {
      this.getAllEventCategory();
    });
  }

  private getAllEventCategory(): void {
    this.eventService.getAllEventCategory().subscribe({
      next: (res: any) => {
        this.eventCat! = res['response-data'];
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.message);
      }
    });
  }

  deleteEventCategory(evId: number): void {
    if (confirm('Seçilən event katqoriyani silməkdə əminsiniz?')) this.eventService.deleteEventCategoryById(evId);
  }

  updEventCategory(item: EventCategory) {
    this.modalComponent.displayStyle="block";
    this.modalComponent.btnVisiblityUpdate = true;
    this.modalComponent.btnVisiblityAdd = false;
    this.modalComponent.textName = "Kateqoriya | Dəyişmək";
    this.modalComponent.onEdit(item);
    //console.log('res: '+item['ec_id']  + ' - '+ item['title_az']);
  }

}
