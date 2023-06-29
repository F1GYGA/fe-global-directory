import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post, PostFormData } from 'src/api/types/post';
import { PostService } from 'src/api/services/post/post.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../app.component';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css'],
})
export class NewsfeedComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  postImage: string = 'assets/new-post-placeholder.jpeg';
  posts: Post[] = [];
  showPostModal: boolean = false;
  matcher = new MyErrorStateMatcher();

  textFormControl = new FormControl('', Validators.required);
  postImageFormControl = new FormControl();

  newPostForm = new FormGroup({
    text: this.textFormControl,
    postImage: this.postImageFormControl,
  });

  constructor(
    private postService: PostService,
    private snackBar: MatSnackBar
  ) {}

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

  clearPostForm(): void {
    this.textFormControl.setValue('');
    this.postImageFormControl.setValue(null);
    this.postImage = 'assets/new-post-placeholder.jpeg';
    this.showPostModal = false;
  }

  sharePost(): void {
    if (this.newPostForm.valid) {
      const formData: PostFormData = {
        text: this.textFormControl.value || '',
        postImage: this.postImageFormControl.value,
      };
      this.postService.createPost(formData).subscribe({
        next: () => {
          this.getPosts();
          this.clearPostForm();
          this.snackBar.open('Post created successfully.', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'success-snackbar',
          });
        },
        error: (): void => {
          this.snackBar.open(
            `Failed to create post. Please try again.`,
            'Close',
            {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'error-snackbar',
            }
          );
        },
      });
    }
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

  onFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.postImage = reader.result as string;
        this.postImageFormControl.setValue(file);
      };
      reader.readAsDataURL(file);
    }
  }
}
