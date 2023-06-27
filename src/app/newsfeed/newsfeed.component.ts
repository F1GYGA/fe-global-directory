import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from 'src/api/types/post';
import { PostService } from 'src/api/services/post/post.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  posts: Post[] = [];
  newPostContent: string = '';
  showPostModal: boolean = false;
  selectedImage: File | null = null;

  constructor(private postService: PostService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }

  openPostModal(): void {
    this.showPostModal = true;
  }

  openImageUploader(): void {
    const fileInput = document.getElementById('imageInput');
    if (fileInput) {
      fileInput.click();
    }
  }

  onImageSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedImage = inputElement.files[0];
    }
  }
  
  cancelPost(): void {
    this.newPostContent = '';
    this.showPostModal = false;
  }

  sharePost(): void {
    this.postService.createPost(this.newPostContent, this.selectedImage).subscribe(
      response => {
        console.log(response);
        this.snackBar.open('Post created successfully', 'Close', {
          duration: 3000
        });
        this.newPostContent = '';
        this.showPostModal = false;
        this.getPosts();
      },
      error => {
        console.error(error);
        this.snackBar.open('Failed to create post', 'Close', {
          duration: 3000
        });
      }
    );
  }

  onLike(postId: number): void {
    alert('Like clicked for post ID: ' + postId);
  }

  onComment(postId: number): void {
    alert('Comment clicked for post ID: ' + postId);
  }

  onNavigateToAboutMe(userId: number): void {
    alert('Navigate to About Me clicked for user ID: ' + userId);
  }
}
