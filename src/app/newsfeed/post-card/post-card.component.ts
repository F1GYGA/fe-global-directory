import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MyErrorStateMatcher } from '../../app.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post, PostStats } from '../../../api/types/post';
import {
  Like,
  PostComment,
  PostCommentFormData,
} from '../../../api/types/reaction';
import { MatDialog } from '@angular/material/dialog';
import { ReactionService } from '../../../api/services/reaction/reaction.service';
import { Router } from '@angular/router';
import { User } from '../../../api/types/user';
import { ViewPostDialogComponent } from '../view-post-dialog/view-post-dialog.component';
import { PostService } from '../../../api/services/post/post.service';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { ViewLikesDialogComponent } from '../view-likes-dialog/view-likes-dialog.component';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
  animations: [
    trigger('detailOpen', [
      state(
        'closed, void',
        style({
          height: '0px',
          minHeight: '0',
          opacity: '0',
        })
      ),
      state('open', style({ height: '*', opacity: '1' })),
      transition(
        'open <=> closed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class PostCardComponent implements OnInit {
  @Input() post!: Post;
  @Input() likes!: Like[];
  @Input() authUser!: User | null;
  @Input() isAdmin: boolean = false;
  @Input() likedByAuthUser: boolean = false;
  @Output() changeLikeStatus = new EventEmitter<boolean>();
  @Output() postDeleted = new EventEmitter<void>();
  currentCharacterCount: number = 0;
  maxCharacterCount: number = 1000;
  commentsViewState: string = 'closed';
  welcomePostImagePlaceholder: string = '/assets/welcome-post-placeholder.png';
  promotionPostImagePlaceholder: string =
    '/assets/promotion-post-placeholder.png';
  anniversaryPostImagePlaceholder: string =
    '/assets/anniversary-post-placeholder.png';
  profilePhotoPlaceholder: string = '/assets/profile-photo-placeholder.png';
  matcher = new MyErrorStateMatcher();
  commentFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(this.maxCharacterCount),
  ]);

  newCommentForm = new FormGroup({
    text: this.commentFormControl,
  });

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private reactionService: ReactionService,
    private postService: PostService
  ) {}

  onCommentInputChange(): void {
    this.currentCharacterCount = this.commentFormControl.value
      ? this.commentFormControl.value.length
      : 0;
  }

  resetNewCommentForm(): void {
    this.commentFormControl.reset();
  }

  openNewCommentForm(): void {
    if (this.commentsViewState === 'closed') {
      this.commentsViewState = 'open';
      this.getComments();
    } else this.commentsViewState = 'closed';
  }

  getComments(): void {
    const userId = this.authUser?.id;
    const postId = this.post.postId;
    if (userId !== undefined) {
      this.reactionService.getComments(userId, postId).subscribe({
        next: (comments: PostComment[]): void => {
          this.post.comments = this.sortCommentsAscending(comments);
        },
        error: (): void => {
          this.snackBar.open(
            `There was an error while loading data from the server.`,
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

  sortCommentsAscending(comments: PostComment[]): PostComment[] {
    return comments.sort((a: PostComment, b: PostComment) => {
      return a.id - b.id;
    });
  }

  getPostStats(): void {
    const userId = this.authUser?.id;
    const postId = this.post.postId;
    if (userId !== undefined) {
      this.reactionService.getPostStats(userId, postId).subscribe({
        next: (postStats: PostStats): void => {
          this.post.nrOfLikes = postStats.nrLikes;
          this.post.nrOfComments = postStats.nrCommentaries;
          this.likedByAuthUser = postStats.liked;
        },
        error: (): void => {
          this.snackBar.open(
            `There was an error while loading data from the server.`,
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

  closeNewCommentForm(): void {
    this.commentsViewState = 'closed';
    this.resetNewCommentForm();
  }

  ngOnInit(): void {}

  onDeletePost(postId: number): void {
    this.postService.deletePost(postId).subscribe({
      next: () => {
        this.postDeleted.emit();
        this.snackBar.open('Post deleted successfully.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'success-snackbar',
        });
      },
      error: (): void => {
        this.snackBar.open(
          `Failed to delete this post. Please try again.`,
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

  onLike(): void {
    const userId = this.authUser?.id;
    const postId = this.post.postId;
    if (userId !== undefined) {
      this.reactionService.addLike(userId, postId).subscribe({
        next: () => {
          this.getPostStats();
          this.changeLikeStatus.emit(true);
        },
        error: (): void => {
          this.snackBar.open(
            `Failed to like this post. Please try again.`,
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

  onComment(): void {
    if (this.newCommentForm.valid) {
      const formData: PostCommentFormData = {
        text: this.commentFormControl.value || '',
      };
      const userId = this.authUser?.id;
      const postId = this.post.postId;
      if (userId !== undefined) {
        this.reactionService.addComment(formData, userId, postId).subscribe({
          next: () => {
            this.getComments();
            this.getPostStats();
            this.resetNewCommentForm();
            this.currentCharacterCount = 0;
            this.snackBar.open(
              'Your new comment has been added successfully.',
              'Close',
              {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
                panelClass: 'success-snackbar',
              }
            );
          },
          error: (): void => {
            this.snackBar.open(
              `Failed to add your new comment. Please try again.`,
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
  }

  onRemoveLike(): void {
    const userId = this.authUser?.id;
    const postId = this.post.postId;

    if (userId !== undefined) {
      this.reactionService.getLikes(postId, userId).subscribe({
        next: (likes: Like[]): void => {
          const likeId = likes.find(
            like => like.userId === userId && like.postId === postId
          )?.id;
          if (likeId) {
            this.reactionService.deleteLike(likeId).subscribe({
              next: () => {
                this.getPostStats();
                this.changeLikeStatus.emit(false);
              },
            });
          } else {
            this.snackBar.open(`You have not liked this post.`, 'Close', {
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'warning-snackbar',
            });
          }
        },
        error: (): void => {
          this.snackBar.open(
            `There was an error while loading data from the server.`,
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

  onDeleteComment(commentId: number): void {
    this.reactionService.deleteComment(commentId).subscribe({
      next: () => {
        this.getComments();
        this.getPostStats();
        this.snackBar.open('You successfully deleted this comment.', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'success-snackbar',
        });
      },
      error: (): void => {
        this.snackBar.open(
          `Failed to delete this comment. Please try again.`,
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

  onNavigateToUserProfile(userId: number): void {
    this.router.navigate(['/about', userId]);
  }

  openViewPostDialog(post: Post): void {
    this.dialog.open(ViewPostDialogComponent, {
      width: '100%',
      maxWidth: '1000px',
      data: {
        post: post,
        likedByAuthUser: this.likedByAuthUser,
        changeLikeStatus: this.changeLikeStatus,
        authUser: this.authUser,
        isAdmin: this.isAdmin,
        profilePhotoPlaceholder: this.profilePhotoPlaceholder,
        matcher: this.matcher,
        commentFormControl: this.commentFormControl,
        getPostStats: () => this.getPostStats(),
        onDeletePost: (postId: number) => this.onDeletePost(postId),
        onLike: () => this.onLike(),
        onRemoveLike: () => this.onRemoveLike(),
        onComment: () => this.onComment(),
        onDeleteComment: (commentId: number) => this.onDeleteComment(commentId),
        onNavigateToUserProfile: (userId: number) =>
          this.onNavigateToUserProfile(userId),
      },
    });
  }

  openImageDialog(post: Post): void {
    this.dialog.open(ImageDialogComponent, {
      width: '100%',
      maxWidth: '100%',
      data: {
        image: post.postImage.base64Img,
      },
    });
  }

  openViewLikesDialog(): void {
    const userId = this.authUser?.id;
    const postId = this.post.postId;
    if (userId !== undefined) {
      this.reactionService.getLikes(postId).subscribe({
        next: (likes: Like[]): void => {
          this.likes = likes;
          this.dialog.open(ViewLikesDialogComponent, {
            width: '100%',
            maxWidth: '320px',
            minHeight: '320px',
            data: {
              likes: this.likes,
            },
          });
        },
        error: (): void => {
          this.snackBar.open(
            `There was an error while loading data from the server.`,
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
}
