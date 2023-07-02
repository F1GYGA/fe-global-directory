import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import {
  EditProfileFormData,
  RegistrationRequest,
  UpdateProfilePayloadData,
  User,
} from '../../types/user';
import { tap } from 'rxjs/operators';
import { UserFilterResult } from '../../../app/search-colleagues/search-colleagues.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUserProfile() {
    throw new Error('Method not implemented.');
  }
  private readonly apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  updateProfile(
    formData: EditProfileFormData
  ): Observable<UpdateProfilePayloadData> {
    const payload: UpdateProfilePayloadData = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      jobTitle: formData.jobTitle,
      team: formData.team,
      department: formData.department,
      previousExperience: formData.previousExperience,
      skills: formData.skills,
      hobbies: formData.hobbies,
    };

    if (formData.profilePhoto instanceof File) {
      const reader = new FileReader();
      reader.readAsDataURL(formData.profilePhoto);
      return new Observable(observer => {
        reader.onload = () => {
          payload['profileImage'] = {
            name: `${formData.email}_profilePhoto`,
            type: formData.profilePhoto?.type || '',
            base64Img: reader.result || '',
          };
          this.http
            .put<UpdateProfilePayloadData>(
              `http://localhost:8080/update`,
              payload
            )
            .pipe(
              tap((response: any) => {
                observer.next(response);
                observer.complete();
              }),
              catchError(error => {
                observer.error(error);
                return of(error);
              })
            )
            .subscribe();
        };
      });
    } else {
      return this.http.put<UpdateProfilePayloadData>(
        `http://localhost:8080/update`,
        payload
      );
    }
  }

  getRegistrationRequests(): Observable<RegistrationRequest[]> {
    return this.http.get<RegistrationRequest[]>(
      `${this.apiUrl}/registerRequests`
    );
  }

  getActiveUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/active`);
  }

  getInactiveUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/inactive`);
  }

  approveUser(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/approve`, null, {
      params: { uid: id.toString() },
    });
  }

  rejectUser(
    id: number,
    reason: string,
    description: string
  ): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/reject`,
      { reason, description },
      {
        params: { uid: id.toString() },
      }
    );
  }

  activateUser(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/activate`, null, {
      params: { uid: id.toString() },
    });
  }

  inactivateUser(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/inactivate`, null, {
      params: { uid: id.toString() },
    });
  }

  getFilteredUsers(
    filter: string,
    size: number,
    offset: number
  ): Observable<UserFilterResult> {
    const params = new HttpParams()
      .set('dataSearch', filter)
      .set('size', size.toString())
      .set('offset', offset.toString());

    return this.http.get<UserFilterResult>(`${this.apiUrl}/getSearch`, {
      params,
    });
  }
}
