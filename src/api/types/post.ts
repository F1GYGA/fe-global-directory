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

export class Post {
  postId: number;
  userId: number;
  userFullName: string;
  profileImage: string | ArrayBuffer;
  timePeriod: string;
  text: string;
  nrOfLikes: number;
  nrOfComments: number;
  isLikedByCurrentUser: boolean;
  postImage?: {
    base64Img: string;
  };

  constructor(
    postId: number,
    userId: number,
    userFullName: string,
    profileImage: string | ArrayBuffer,
    timePeriod: string,
    text: string,
    nrOfLikes: number,
    nrOfComments: number,
    isLikedByCurrentUser: boolean,
    postImage?: {
      base64Img: string;
    }
  ) {
    this.postId = postId;
    this.userId = userId;
    this.userFullName = userFullName;
    this.profileImage = profileImage;
    this.timePeriod = timePeriod;
    this.text = text;
    this.nrOfLikes = nrOfLikes;
    this.nrOfComments = nrOfComments;
    this.postImage = postImage;
    this.isLikedByCurrentUser = isLikedByCurrentUser;
  }
}
