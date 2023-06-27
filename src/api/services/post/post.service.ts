import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../types/post';
import { JwtService } from '../jwt/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly apiUrl = 'http://localhost:8080/api/posts';

  constructor(private http: HttpClient) {}

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}`);
  }

  createPost(content: string, image: File | null): Observable<any> {
    const formData: FormData = new FormData();
  
    const createPostDTO = {
      text: content,
      postImage: image as File | null 
    };
  
    if (image) {
      formData.append('postImage', image, image.name);
    }
  
    formData.append('createPostDTO', JSON.stringify(createPostDTO));
  
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.getToken()}`)
      .set('Content-Type', 'multipart/form-data');
  
    return this.http.post(`${this.apiUrl}/createPost`, formData, { headers });
  }
  
  
  
  
  
}
