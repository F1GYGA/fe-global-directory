import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import {
  EditProfileFormData,
  RegistrationRequest,
  UpdateProfilePayloadData,
  User,
} from '../../types/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
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
}
