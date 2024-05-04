import Post from "../models/Post.js";
import User from "../models/User.js";
import { updateScore } from "./scores.js";

import { Types } from 'mongoose';
const { ObjectId } = Types;


/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath, communityName } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      communityName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getCommunityPosts = async (req, res) => {
  try {
    const { communityName } = req.params;
    const post = await Post.find  
    ({ communityName });
    res.status(200).json(post);
  }
  catch (err) {
    res.status(404).json({ message: err.message });
  } 
}

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};




export const patchComment = async (req, res) => {
  try {
    const { id } = req.params; // Post ID
    const { userId, text } = req.body; // Assuming userId and text are provided in the request body

    // Generate a unique comment ID for this specific comment
    const commentId = new ObjectId();

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: { _id: commentId, userId, text, flags: [] } // Use the generated comment ID
        }
      },
      { new: true } // Return the updated post after the update operation
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Update user's comments array using $push without saving the user explicitly
    await User.updateOne(
      { _id: userId },
      {
        $push: {
          comments: { _id: commentId, postId: id, userId, text, flags: [] } // Use the same generated comment ID
        }
      }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
