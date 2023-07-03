import { PostComment } from './reaction';

export type PostFormData = {
  text: string;
  postImage: File | null;
};

type Image = {
  name: string;
  type: string;
  base64Img: string | ArrayBuffer;
};

export type PostPayloadData = {
  text: string;
  postImage?: Image;
};

type ImageData = {
  id: number;
  image: Image;
};

export type PostResponse = {
  text: string;
  postImage: ImageData | null;
};

export type PostRequest = {
  text: string;
  postImage: Image | null;
};

export type Post = {
  postId: number;
  userId: number;
  userFullName: string;
  userProfileImage: Image;
  timePeriod: string;
  type: 'JOINING_POST' | 'ANNIVERSARY_POST' | 'PROMOTION_POST' | 'MANUAL_POST';
  text: string;
  postImage: Image;
  liked: boolean;
  nrOfLikes: number;
  nrOfComments: number;
  comments: PostComment[];
};

export type PostStats = {
  postId: number;
  liked: boolean;
  nrLikes: number;
  nrCommentaries: number;
};
