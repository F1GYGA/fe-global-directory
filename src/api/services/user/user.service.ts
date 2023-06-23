import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationRequest, User } from '../../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
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
