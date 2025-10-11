import { inject, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { EventCategory } from '../../dto/event-category';
import { UserDto } from '../../dto/user-dto';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private refreshRequired = new Subject<void>();
  toaster: ToastrService = inject(ToastrService);

  constructor(private http: HttpClient) {
  }

  get RefreshRequired() {
    return this.refreshRequired;
  }
  getAllEmployee(): Observable<any> { //Admin gorecek butun emekdas siyahisi
    return this.http.get('user');
  }

  postEmployee(name:string, surname:string, email:string):void {
    const data:UserDto = {
      'firstname': name,
      'lastname': surname,
      'email': email
    };

    this.http.post('user', data).pipe(
      tap(() => {
        this.RefreshRequired.next();
      })
    ).subscribe({
      next: (res: any) => {
        if (res.message != null && res.message == 'success') {
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


  deleteEmpById(empId: number): void {
    let params: HttpParams = new HttpParams()
      .set('emp_id', empId);
    this.http.delete('user', { params })
      .pipe(
        tap(() => {
          this.RefreshRequired.next();
        })
      )
      .subscribe({
        next: (res: any) => {
          if (res.message != '' && res.message == 'success') {
            this.toaster.success(empId + ' nömrəli əməkdaş uğurla silindi');
          }
        },
        error: (err: HttpErrorResponse) => {
          this.toaster.error(err.error.detail, err.error.title);
        }
      });
  }
}
