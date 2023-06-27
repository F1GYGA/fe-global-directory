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
