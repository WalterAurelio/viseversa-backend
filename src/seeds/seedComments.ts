import Comment from "../models/Comment";
import comments from "../json/comments.json";

const seedComments = async () => {
  await Comment.deleteMany({});
  console.log("✅ Comentarios eliminados de la base de datos");

  await Comment.insertMany(comments.map((comment) => ({ _id: comment.id, ...comment })));
  console.log("✅ Comentarios insertados en la base de datos");
};

export default seedComments;
