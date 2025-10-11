import { inject, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { RolesDto } from '../../dto/roles-dto';
import { EventCategory } from '../../dto/event-category';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private refreshRequired = new Subject<void>();
  toaster: ToastrService = inject(ToastrService);

  constructor(private http: HttpClient) {
  }

  get RefreshRequired() {
    return this.refreshRequired;
  }

  getAllRoles(): Observable<RolesDto> { //Admin gorecek butun event category siyahisi
    return this.http.get<RolesDto>('role');
  }

  updateRoleById(rolId : number, title:string, description:string) {
    let params:RolesDto =
      {
        role_id: rolId,
        title: title,
        description: description
      }

    this.http.put('role', params).pipe(
      tap(():void => {
        this.RefreshRequired.next();
      })
    )
      .subscribe({
        next: (res: any):void => {
          if (res.message != "" && res.message == "Success") {
            this.toaster.success(rolId + ' nömrəli role uğurla deyisdirildi')
          }
        },
        error: (err: HttpErrorResponse) => {
          this.toaster.error(err.error, "err: " + err.message)
        }
      })
  }

  postNewRole(title:string, description:string):void {
    const data:RolesDto = {
      'title': title,
      'description': description
    };

    this.http.post('role', data).pipe(
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

  deleteRoleById(roleId: number): void {
    let params: HttpParams = new HttpParams()
      .set('role_id', roleId);
    this.http.delete('role', { params })
      .pipe(
        tap(() => {
          this.RefreshRequired.next();
        })
      )
      .subscribe({
        next: (res: any) => {
          if (res.message != '' && res.message == 'Uğurlu əməliyyat') {
            this.toaster.success(roleId + ' nömrəli role uğurla silindi');
          }
        },
        error: (err: HttpErrorResponse) => {
          this.toaster.error(err.error.detail, err.error.title);
        }
      });
  }

}
