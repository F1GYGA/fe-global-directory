import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AddLikePayloadData,
  PostCommentFormData,
  PostCommentPayloadData,
  PostCommentResponse,
  Like,
  PostComment,
  AddLikeResponse,
} from '../../types/reaction';
import { PostStats } from '../../types/post';

@Injectable({
  providedIn: 'root',
})
export class ReactionService {
  private readonly apiUrl = 'http://localhost:8080/api/reactions';

  constructor(private http: HttpClient) {}

  getPostStats(userId: number, postId: number): Observable<PostStats> {
    return this.http.get<PostStats>(`${this.apiUrl}/count`, {
      params: { uid: userId.toString(), pid: postId.toString() },
    });
  }

  getLikes(postId: number, userId?: number): Observable<Like[]> {
    return this.http.get<Like[]>(`${this.apiUrl}/likes`, {
      params: userId
        ? { uid: userId.toString(), pid: postId.toString() }
        : { pid: postId.toString() },
    });
  }

  addLike(userId: number, postId: number): Observable<AddLikeResponse> {
    const payload: AddLikePayloadData = {
      userId: userId,
      postId: postId,
    };
    return this.http.post<AddLikeResponse>(`${this.apiUrl}/likes`, payload);
  }

  deleteLike(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/likes/${id}`);
  }

  getComments(userId: number, postId: number): Observable<PostComment[]> {
    return this.http.get<PostComment[]>(`${this.apiUrl}/comments`, {
      params: { uid: userId.toString(), pid: postId.toString() },
    });
  }

  addComment(
    formData: PostCommentFormData,
    userId: number,
    postId: number
  ): Observable<PostCommentResponse> {
    const payload: PostCommentPayloadData = {
      text: formData.text,
      userId: userId,
      postId: postId,
    };
    return this.http.post<PostCommentResponse>(
      `${this.apiUrl}/comments`,
      payload
    );
  }

  deleteComment(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.apiUrl}/comments/${id}`
    );
  }
}
