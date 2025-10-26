import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardComponent } from '@app/theme/shared/components/card/card.component';

interface Room {
  id: number;
  name: string;
  building: string;
  capacity: number;
}



@Component({
  selector: 'app-event-venues',
  imports: [
    FormsModule,
    CardComponent
  ],
  templateUrl: './event-venues.component.html',
  styleUrl: './event-venues.component.css'
})
export class EventVenuesComponent {

  title:string = "Tədbir Məkanları";
  rooms: Room[] = [
    { id: 1, name: 'Senat Zalı', building: 'Main Campus', capacity: 120 },
    { id: 2, name: 'Konfrans Otağı', building: 'White City', capacity: 80 }
  ];

  currentRoom: Room = { id: 0, name: '', building: '', capacity: 0 };
  editMode = false;

  openAdd() {
    this.editMode = false;
    this.currentRoom = { id: 0, name: '', building: '', capacity: 0 };
    this.openModal();
  }

  openEdit(room: Room) {
    this.editMode = true;
    this.currentRoom = { ...room };
    this.openModal();
  }

  saveRoom() {
    if (this.editMode) {
      const index = this.rooms.findIndex(r => r.id === this.currentRoom.id);
      if (index > -1) this.rooms[index] = { ...this.currentRoom };
    } else {
      this.currentRoom.id = this.rooms.length + 1;
      this.rooms.push({ ...this.currentRoom });
    }
    this.closeModal();
  }

  deleteRoom(id: number) {
    this.rooms = this.rooms.filter(r => r.id !== id);
  }

  // Modal açıb-bağlamaq üçün Bootstrap JS istifadə olunur
  openModal() {
    const modal = new (window as any).bootstrap.Modal(document.getElementById('roomModal'));
    modal.show();
  }

  closeModal() {
    const modalEl = document.getElementById('roomModal');
    const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  }


}
