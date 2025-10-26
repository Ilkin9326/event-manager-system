import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) {}

  showError(message: string): void {
    this.toastr.error(message, 'Xəta');
  }

  showSuccess(message: string): void {
    this.toastr.success(message, 'Uğur');
  }

  showInfo(message: string): void {
    this.toastr.info(message, 'Məlumat');
  }

  showWarning(message: string): void {
    this.toastr.warning(message, 'Diqqət');
  }
}
