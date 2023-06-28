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
  timePeriod: string;
  content: string;
  nrOfLikes: number;
  nrOfComments: number;

  constructor(
    postId: number,
    userId: number,
    userFullName: string,
    timePeriod: string,
    content: string,
    nrOfLikes: number,
    nrOfComments: number
  ) {
    this.postId = postId;
    this.userId = userId;
    this.userFullName = userFullName;
    this.timePeriod = timePeriod;
    this.content = content;
    this.nrOfLikes = nrOfLikes;
    this.nrOfComments = nrOfComments;
  }
}
