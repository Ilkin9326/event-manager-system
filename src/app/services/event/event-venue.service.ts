import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { catchError, EMPTY, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { VenueDto } from '@app/dto/venue-dto';

@Injectable({
  providedIn: 'root'
})
export class EventVenueService {
  private http = inject(HttpClient);
  private toaster = inject(ToastrService);
  private _venueCache: WritableSignal<VenueDto[] | null> = signal(null);
  public readonly venues: Signal<VenueDto[]> = this._venueCache.asReadonly();


  getAllEventVenues(): void {
    //Əgər data artıq Signal-da varsa, API-yə getmə
    if (this._venueCache()) return;

    // Keş boşdursa (null-dırsa), API-yə muraciet et
    this.http.get<VenueDto[]>('venues').pipe(
      catchError((err: HttpErrorResponse) => {
        const errorMsg = err.error?.message || err.statusText || 'Tədbir Məkanları yüklənərkən xəta baş verdi';
        this.toaster.error(errorMsg);
        this._venueCache.set([]);
        return EMPTY;
      })
    ).subscribe(res => {
      this._venueCache.set(res['data'] || []);
    });
  }

  postNewVenueInfo(venueData: VenueDto) {
    this.http.post('venues', venueData).subscribe({
      next: (res: any) => {
        if (res.message != null && res.message == 'success') {
          this.toaster.success('Emeliyyat ugurla yerine yetirildi');
          this.forceReloadVenues();
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.toaster.error(err.error.title, err['Error message']);
      },
      complete() {
        console.log('complete edildi');
      }
    });
  }

  updateEventVenue(venueData: VenueDto): void {
    const venueId: number = venueData.v_id;
    if (!venueId) {
      this.toaster.error('Otağın ID-si tapılmadı. Yenilənmə mümkün deyil.');
      throwError(() => new Error('Venue ID is missing.'));
    }

    this.http.put('venues', venueData).subscribe({
      next: (res: any) => {
        if (res.message != '' && res.message == 'success') {
          this.toaster.success('Məkan məlumatları uğurla yeniləndi!');
          this.forceReloadVenues();
        }
      },
      error(err: HttpErrorResponse) {
        this.toaster.error('Məlumat yenilənərkən xəta baş verdi.');
        return throwError(() => err);
      }
    });
  }

  deleteVenue(vId: number) {
    let params: HttpParams = new HttpParams()
      .set('v_id', vId);
    this.http.delete('venues', { params })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          const errorMsg = err.error?.message || err.statusText || 'Silmə zamanı xəta baş verdi';
          this.toaster.error(errorMsg);
          this._venueCache.set([]);
          return EMPTY;
        })
      ).subscribe({
      next: (res: any) => {
        if (res.message != '' && res.message == 'success') {
          this.toaster.success('Seçilən otaq uğurla silindi');
          this.forceReloadVenues();
        }
      }
    });
  }

  // Add/Edit əməliyyatlarından sonra datanı yeniləmək üçün metod
  forceReloadVenues(): void {
    this._venueCache.set(null); // Keşi sıfırla (API zəngi məcbur ediləcək)
    this.getAllEventVenues();
  }

}
