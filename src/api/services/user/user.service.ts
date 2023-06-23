import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getRegistrationRequests(): Observable<any> {
    return this.http.get(`${this.apiUrl}/registerRequests`);
  }

  getActiveUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/active`);
  }

  getInactiveUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/inactive`);
  }

  approveUser(uid: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/approve`, null, {
      params: { uid: uid.toString() },
    });
  }

  rejectUser(
    uid: number,
    reason: string,
    description: string
  ): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/reject`,
      { reason, description },
      {
        params: { uid: uid.toString() },
      }
    );
  }

  activateUser(uid: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/activate`, null, {
      params: { uid: uid.toString() },
    });
  }

  inactivateUser(uid: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/inactivate`, null, {
      params: { uid: uid.toString() },
    });
  }
}
