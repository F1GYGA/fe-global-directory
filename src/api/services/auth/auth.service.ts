import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  RegisterFormData,
  RegisterPayloadData,
  RegistrationResponse,
  ResetPasswordFormData,
} from '../../types/auth';
import { JwtService } from '../jwt/jwt.service';

interface LoginResponse {
  token: string;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/api/auth';

  private authStatusSubject = new BehaviorSubject<boolean>(
    this.isAuthenticated()
  );
  public authStatus = this.authStatusSubject.asObservable();

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  setUserId(userId: number): void {
    localStorage.setItem('userId', userId.toString());
  }

  getUserId(): number | null {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId, 10) : null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && !this.jwtService.isTokenExpired(token);
  }

  getUserRoles(): string[] | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtService.decodeToken(token);
      return decodedToken.authorities;
    }
    return null;
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(response => {
          this.setToken(response.token);
          this.setUserId(response.userId);
          this.authStatusSubject.next(true);
        })
      );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        this.authStatusSubject.next(false);
      })
    );
  }

  register(formData: RegisterFormData): Observable<RegistrationResponse> {
    const payload: RegisterPayloadData = {
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfEmployment: formData.dateOfEmployment,
      jobTitle: formData.jobTitle,
      team: formData.team,
      department: formData.department,
    };

    if (formData.profilePhoto) {
      const reader = new FileReader();
      reader.readAsDataURL(formData.profilePhoto);
      return new Observable(observer => {
        reader.onload = () => {
          payload['image'] = {
            name: `${formData.email}_profilePhoto`,
            type: formData.profilePhoto?.type || '',
            base64Img: reader.result || '',
          };
          this.http
            .post<RegistrationResponse>(`${this.apiUrl}/register`, payload)
            .pipe(
              tap((response: RegistrationResponse) => {
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
      return this.http.post<RegistrationResponse>(
        `${this.apiUrl}/register`,
        payload
      );
    }
  }

  sendResetPasswordEmail(email: string): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/sendEmail`, { email });
  }

  resetPassword(
    resetPasswordData: ResetPasswordFormData,
    token: string
  ): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(
      `http://localhost:8080/reset`,
      { resetPasswordData },
      { headers }
    );
  }
}
