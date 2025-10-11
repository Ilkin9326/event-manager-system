import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { EventCategory } from '../../dto/event-category';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private refreshRequired = new Subject<void>();
  toaster: ToastrService = inject(ToastrService);

  constructor(private http: HttpClient) {
  }

  get RefreshRequired() {
    return this.refreshRequired;
  }

  getAllEventCategory(): Observable<any> { //Admin gorecek butun event category siyahisi
    return this.http.get('event-cat');
  }

  postEventCategory(catAz:string, catEn:string, catRu:string):void {
    const data:EventCategory = {
      'title_az': catAz,
      'title_en': catEn,
      'title_ru': catRu
    };

    this.http.post('event-cat', data).pipe(
      tap(() => {
        this.RefreshRequired.next();
      })
    ).subscribe({
      next: (res: any) => {
        if (res.message != null && res.message == 'Success') {
          this.toaster.success('Emeliyyat ugurla yerine yetirildi');
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

  updateEventCategoryById(ecId : number, catAz:string, catEn:string, catRu:string) {
    let params:EventCategory =
      {
        ec_id: ecId,
        title_az: catAz,
        title_en: catEn,
        title_ru: catRu
      }

    this.http.put('event-cat', params).pipe(
      tap(():void => {
        this.RefreshRequired.next();
      })
    )
      .subscribe({
        next: (res: any):void => {
          if (res.message != "" && res.message == "Success") {
            this.toaster.success(ecId + ' nömrəli event uğurla deyisdirildi')
          }
        },
        error: (err: HttpErrorResponse) => {
          this.toaster.error(err.error, "err: " + err.message)
        }
      })
  }

  deleteEventCategoryById(ecId: number): void {
    let params: HttpParams = new HttpParams()
      .set('ec_id', ecId);
    this.http.delete('event-cat', { params })
      .pipe(
        tap(() => {
          this.RefreshRequired.next();
        })
      )
      .subscribe({
        next: (res: any) => {
          if (res.message != '' && res.message == 'Uğurlu əməliyyat') {
            this.toaster.success(ecId + ' nömrəli event-kateqoiya uğurla silindi');
          }
        },
        error: (err: HttpErrorResponse) => {
          this.toaster.error(err.error.detail, err.error.title);
        }
      });
  }
}
