import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  postId: {
    type: String,
    ref: 'Post',
    required: true,
  },
  userId: {
    type: String,
    ref: 'User',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  flags: {
    type: [String],
    default: [],
  },
});

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    communityName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    userScore: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: [commentSchema], // Array of comments with postId, text, and flags
      default: [],
    },
    // userScore : {
    //   type: Number,
    //   default: 0
    // },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
