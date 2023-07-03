export type PostComment = {
  id: number;
  postId: number;
  userId: number;
  timePassed: string;
  userFullName: string;
  text: string;
};

export type PostCommentFormData = {
  text: string;
};

export type PostCommentPayloadData = {
  text: string;
  userId: number;
  postId: number;
};

export type PostCommentResponse = {
  id: number;
  text: string;
  timestamp: string;
};

type Image = {
  name: string;
  type: string;
  base64Img: string | ArrayBuffer;
};

export type Like = {
  id: number;
  postId: number;
  userId: number;
  userFullName: string;
  userProfileImage: Image;
};

export type AddLikePayloadData = {
  postId: number;
  userId: number;
};

export type AddLikeResponse = {
  id: number;
};
