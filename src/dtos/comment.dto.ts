import { ICommentDocument } from "../models/Comment";
import IComment from "../interfaces/IComment";

type PopulatedComment = Omit<ICommentDocument, "userId"> & {
  userId: {
    username: string;
    profilePicture?: string;
  };
};

export class CommentDto implements Partial<IComment> {
  id: string;
  content: string;
  createdAt: Date;
  username: string;
  profilePicture?: string;

  constructor(data: PopulatedComment) {
    this.id = data._id.toString();
    this.content = data.content;
    this.createdAt = data.createdAt;
    this.username = data.userId.username;
    this.profilePicture = data.userId.profilePicture;
  }
}
