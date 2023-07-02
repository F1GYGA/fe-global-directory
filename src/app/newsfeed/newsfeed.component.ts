import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post, PostFormData } from 'src/api/types/post';
import { PostService } from 'src/api/services/post/post.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../app.component';
import { UserService } from 'src/api/services/user/user.service';
import { User } from 'src/api/types/user';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css'],
})
export class NewsfeedComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;
  postImage: string = 'assets/new-post-placeholder.jpeg';
  profilePhotoPlaceholder: string = '/assets/profile-photo-placeholder.png';
  posts: Post[] = [];
  showPostModal: boolean = false;
  matcher = new MyErrorStateMatcher();
  userId: any;
  users: { [key: number]: User } = {};

  textFormControl = new FormControl('', Validators.required);
  postImageFormControl = new FormControl();

  newPostForm = new FormGroup({
    text: this.textFormControl,
    postImage: this.postImageFormControl,
  });

  constructor(
    private postService: PostService,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getPosts();

    this.postService.getPosts().subscribe(
      (response) => {
        this.posts = response;

        this.posts.forEach((post) => {
          post.nrOfLikes = post.nrOfLikes || 0;
        });

      },
      (error) => {
        console.error('Failed to fetch posts:', error);
      }
    );

  }


  getPosts(): void {
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
      const userIds = this.posts.map(post => post.userId);
      const userRequests = userIds.map(userId => this.userService.getUserById(userId));
      forkJoin(userRequests).subscribe((users: User[]) => {
        users.forEach(user => {
          this.users[user.id] = user;
        });
      });
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

  onLike(userId: number, postId: number): void {
    const post = this.posts.find((p) => p.postId === postId);
    if (!post) {
      return;
    }
    const isLiked = post.isLikedByCurrentUser;
    const likeAction = isLiked ? 'unlike' : 'like';
    
    post.isLikedByCurrentUser = !isLiked;
  
    this.postService.likePost(postId, userId, likeAction).subscribe(
      (response) => {
        // if (response && response.nrOfLikes !== undefined) {
        //   post.nrOfLikes = response.nrOfLikes;
        // }

        if (response.message == 'Post unliked successfully') {
          post.nrOfLikes -= 1;
        } else {
          post.nrOfLikes += 1;
        }
        console.log(response);
      },
      (error) => {
        console.error('Failed to like/unlike post:', error);
        this.snackBar.open('Failed to like/unlike post. Please try again.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'error-snackbar',
        });
        post.isLikedByCurrentUser = isLiked;
      }
    );
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
