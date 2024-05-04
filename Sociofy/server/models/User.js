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

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    comments: {
      type: [commentSchema], // Array of comments with postId, text, and flags
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
    score: { type: Number, default: 95 },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
