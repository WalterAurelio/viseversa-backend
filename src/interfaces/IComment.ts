interface Comment {
  id: string;
  userId: string;
  productId: string;
  parentCommentId?: string;
  content: string;
  createdAt: Date;
}

export default Comment;
