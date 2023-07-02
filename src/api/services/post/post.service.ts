import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Post, PostFormData, PostPayloadData } from '../../types/post';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostService {

  
  private readonly apiUrl = 'http://localhost:8080/api/posts';

  private readonly apiiUrl = 'http://localhost:8080/api/reactions';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}`);
  }

  likePost(postId: number, userId: number, likeAction: string): Observable<any> {
    return this.http.post<any>(`${this.apiiUrl}/likes`, { postId, userId, likeAction });
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
