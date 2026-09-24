import { CommentDocument } from "../models/Comment";

type CommentWithUserDetails = Omit<CommentDocument, "userId"> & {
  userId: {
    username: string;
    profilePicture?: string;
  };
};

export class ProductCommentDto {
  id: string;
  content: string;
  createdAt: Date;
  username: string;
  profilePicture?: string;
  parentCommentId?: string;

  constructor(data: CommentWithUserDetails) {
    this.id = data._id.toString();
    this.content = data.content;
    this.createdAt = data.createdAt;
    this.username = data.userId.username;
    this.profilePicture = data.userId.profilePicture;
    this.parentCommentId = data.parentCommentId?.toString();
  }
}
