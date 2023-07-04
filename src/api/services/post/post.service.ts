import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Post, PostFormData, PostPayloadData } from '../../types/post';
import { tap } from 'rxjs/operators';
import { Like } from '../../types/reaction';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly apiUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}`);
  }

  getPostsByUser(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}`, {
      params: { uid: userId.toString() },
    });
  }

  getPostsByType(type: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}`, {
      params: { post_type: type },
    });
  }

  deletePost(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  createPost(formData: PostFormData): Observable<any> {
    const payload: PostPayloadData = {
      text: formData.text,
    };

    if (formData.postImage) {
      const reader = new FileReader();
      reader.readAsDataURL(formData.postImage);
      return new Observable(observer => {
        reader.onload = () => {
          payload['postImage'] = {
            name: formData.postImage?.name || '',
            type: formData.postImage?.type || '',
            base64Img: reader.result || '',
          };
          this.http
            .post<any>(`${this.apiUrl}/new`, payload)
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
      return this.http.post<any>(`${this.apiUrl}/new`, payload);
    }
  }
}
