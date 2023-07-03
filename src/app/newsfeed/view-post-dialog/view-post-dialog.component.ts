import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { User } from '../../../api/types/user';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PostComment } from '../../../api/types/reaction';
import { Post } from '../../../api/types/post';

@Component({
  selector: 'app-view-post-dialog',
  templateUrl: './view-post-dialog.component.html',
  styleUrls: ['./view-post-dialog.component.css'],
})
export class ViewPostDialogComponent implements OnInit {
  @ViewChild('postContainer') postContainer!: ElementRef;
  @ViewChild('newCommentInput') newCommentInput!: ElementRef;
  currentCharacterCount: number = 0;
  maxCharacterCount: number = 1000;
  authUser!: User | null;
  likedByAuthUser!: boolean;
  isAdmin!: boolean;
  profilePhotoPlaceholder!: string;
  matcher!: ErrorStateMatcher;
  commentFormControl!: FormControl;
  getPostStats!: () => void;
  onDeletePost!: (postId: number) => void;
  onLike!: () => void;
  onRemoveLike!: () => void;
  onComment!: () => void;
  onDeleteComment!: (commentId: number) => void;
  onNavigateToUserProfile!: (userId: number) => void;

  constructor(
    public dialogRef: MatDialogRef<ViewPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      post: Post;
      likedByAuthUser: boolean;
      changeLikeStatus: EventEmitter<boolean>;
      authUser: User | null;
      isAdmin: boolean;
      profilePhotoPlaceholder: string;
      matcher: ErrorStateMatcher;
      commentFormControl: FormControl;
      getPostStats: () => void;
      onDeletePost: (postId: number) => void;
      onLike: () => void;
      onRemoveLike: () => void;
      onComment: () => void;
      onDeleteComment: (commentId: number) => void;
      onNavigateToUserProfile: (userId: number) => void;
    }
  ) {
    this.likedByAuthUser = data.likedByAuthUser;
    this.data.changeLikeStatus.subscribe((newLikeStatus: boolean) => {
      this.likedByAuthUser = newLikeStatus;
    });
    this.authUser = data.authUser;
    this.isAdmin = data.isAdmin;
    this.profilePhotoPlaceholder = data.profilePhotoPlaceholder;
    this.matcher = data.matcher;
    this.commentFormControl = data.commentFormControl;
    this.getPostStats = data.getPostStats;
    this.onDeletePost = data.onDeletePost;
    this.onLike = data.onLike;
    this.onRemoveLike = data.onRemoveLike;
    this.onComment = () => {
      data.onComment();
      this.resetCurrentCharacterCount();
    };
    this.onDeleteComment = data.onDeleteComment;
    this.onNavigateToUserProfile = data.onNavigateToUserProfile;
    this.data.post.comments = this.sortCommentsAscending(data.post.comments);
  }

  onCommentInputChange(): void {
    this.currentCharacterCount = this.commentFormControl.value
      ? this.commentFormControl.value.length
      : 0;
  }

  resetCurrentCharacterCount(): void {
    this.currentCharacterCount = 0;
  }

  scrollToCommentInput(): void {
    const viewPostDialogElement = this.postContainer.nativeElement;
    const lastElementChild = viewPostDialogElement.lastElementChild;

    if (lastElementChild) {
      if (
        viewPostDialogElement.clientHeight >= viewPostDialogElement.scrollHeight
      ) {
        this.focusTextarea();
      } else {
        viewPostDialogElement.addEventListener('scroll', (): void => {
          if (
            viewPostDialogElement.scrollTop +
              viewPostDialogElement.clientHeight >=
            viewPostDialogElement.scrollHeight
          ) {
            this.focusTextarea();
            viewPostDialogElement.removeEventListener(
              'scroll',
              this.focusTextarea
            );
          }
        });
        lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    }
  }

  sortCommentsAscending(comments: PostComment[]): PostComment[] {
    return comments.sort((a: PostComment, b: PostComment) => {
      return a.id - b.id;
    });
  }

  focusTextarea(): void {
    this.newCommentInput.nativeElement.focus();
  }

  onClosePostView(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}
}
