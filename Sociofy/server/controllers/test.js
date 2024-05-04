import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs';
import * as toxicity from '@tensorflow-models/toxicity';
import User from '../models/User.js'; 
import Post from '../models/Post.js'; 

// // The minimum prediction confidence.
const threshold = 0.8;
 
// async function classifyComment(req, res) {
//   try {
//     const model = await toxicity.load(threshold);
//     const userId = req.params.id;
//     const { text, postId, lastCommentId } = req.body; // Added lastCommentId
//     console.log("User ID:", userId);

//     const user = await User.findById(userId);

//     // Ensure user object is valid before proceeding
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const predictions = await model.classify([text]);
//     // console.log(JSON.stringify(predictions, null, 2)); // Log classification results

//     const toxicCount = predictions.filter(prediction => prediction.results[0].match === true).length;
//     console.log('Non-toxic count:', toxicCount); // Log number of non-toxic comments

//     let userScore = user.score || 95; // Default score to 95 if undefined

//     let flags = [];

//     predictions.map((prediction) => { if (prediction.results[0].match === true) flags.push(prediction.label) } );

//     console.log('Flags:', flags);

//     if (toxicCount > 0) {
//       userScore -= toxicCount; // Decrease score by number of non-toxic comments
//     } else {
//       userScore += 1; // Increase score by 1 if all comments are non-toxic
//     }

//     // Ensure score does not go below 5 or above 95
//     userScore = Math.max(5, Math.min(95, userScore));

//     // Find the comment with the specified postId and update its flags in the user model
//     const commentToUpdate = user.comments.find(comment => comment._id.equals(lastCommentId));
//     if (commentToUpdate) {
//       commentToUpdate.flags = flags;
//     } else {
//       console.error('Comment not found for ID:', lastCommentId);
//     }

//     // Update user flags in comments
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { $set: { comments: user.comments } },
//       { new: true }
//     );

//     if (!updatedUser) {
//       console.error('Error updating user flags:', userId);
//       return res.status(500).json({ message: 'Error updating user flags' });
//     }

//     // Update post flags in comments
//     const post = await Post.findOneAndUpdate(
//       { userId: userId, 'comments._id': lastCommentId }, // Find the post and its comment to update
//       { $set: { 'comments.$.flags': flags } }, // Update the flags in the specified comment
//       { new: true } // Return the updated post after the update operation
//     );

//     if (!post) {
//       console.error('Error updating post flags:', postId);
//       return res.status(500).json({ message: 'Error updating post flags' });
//     }

//     // Log updated user and post, and send response
//     console.log('User score updated:', updatedUser.comments);
//     console.log('Post updated:', post.comments);
//     console.log("User score updated:", updatedUser.score);
//     res.status(200).json({ message: "Score updated successfully", user: updatedUser });
//   } catch (error) {
//     console.error('Error classifying sentences:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }

// export default classifyComment;




async function classifyComment(req, res) {
  try {
    const model = await toxicity.load(threshold);
    const userId = req.params.id;
    const { text, postId, lastCommentId } = req.body; // Ensure postId is included in the request body
    console.log("Post ID:", postId);
    const post = await Post.findById(postId);
    if (!post) {
      console.error('Error finding post:', postId);
      return res.status(404).json({ message: 'Post not found' });
    }

    const commentToUpdate = post.comments.find(comment => comment._id.equals(lastCommentId));
    if (!commentToUpdate) {
      console.error('Comment not found for ID:', lastCommentId);
      return res.status(404).json({ message: 'Comment not found' });
    }

    const predictions = await model.classify([text]);
    const toxicCount = predictions.filter(prediction => prediction.results[0].match === true).length;
    let flags = [];
    predictions.map((prediction) => {
      if (prediction.results[0].match === true) flags.push(prediction.label);
    });

    commentToUpdate.flags = flags; // Update flags in the specific comment

    await post.save(); // Save the updated post with the modified comment

    console.log('Post updated:', post.comments);
    res.status(200).json({ message: "Score updated successfully" });
  } catch (error) {
    console.error('Error classifying sentences:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export default classifyComment;


// import '@tensorflow/tfjs-backend-webgl';
// import * as tf from '@tensorflow/tfjs';
// import * as toxicity from '@tensorflow-models/toxicity';
// import User from '../models/User.js';
// import Post from '../models/Post.js';

// // The minimum prediction confidence.
// const threshold = 0.8;

// async function classifyComment(req, res) {
//   try {
//     const model = await toxicity.load(threshold);
//     const userId = req.params.id;
//     const { text, postId, lastCommentId } = req.body;
//     // Added lastCommentId
//     console.log("User ID:", userId);
//     const user = await User.findById(userId);

//     // Ensure user object is valid before proceeding
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     const predictions = await model.classify([text]);
//     // console.log(JSON.stringify(predictions, null, 2)); // Log classification results
//     const toxicCount = predictions.filter(prediction => prediction.results[0].match === true).length;
//     console.log('Non-toxic count:', toxicCount); // Log number of non-toxic comments
//     let userScore = user.score || 95; // Default score to 95 if undefined
//     let flags = [];

//     predictions.map((prediction) => {
//       if (prediction.results[0].match === true) flags.push(prediction.label)
//     });

//     console.log('Flags:', flags);

//     if (toxicCount > 0) {
//       userScore -= toxicCount; // Decrease score by number of non-toxic comments
//     } else {
//       userScore += 1; // Increase score by 1 if all comments are non-toxic
//     }

//     // Ensure score does not go below 5 or above 95
//     userScore = Math.max(5, Math.min(95, userScore));

//     // Find the comment with the specified postId and update its flags
//     const commentToUpdate = user.comments.find(comment => comment._id.equals(lastCommentId));

//     // Updated to find by comment ID
//     if (commentToUpdate) {
//       commentToUpdate.flags = flags;
//     } else {
//       console.error('Comment not found for ID:', lastCommentId);
//     }

//     // Update user flags in comments
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { $set: { comments: user.comments } }, // Update the comments with the modified flags
//       { new: true } // Return the updated user after the update operation
//     );

//     if (!updatedUser) {
//       console.error('Error updating user flags:', userId);
//       return res.status(500).json({ message: 'Error updating user flags' });
//     }

//     // Update post flags in comments
//     const post = await Post.findOneAndUpdate(
//       { _id: postId, "comments._id": lastCommentId },
//       { $set: { "comments.$.flags": flags } },
//       { new: true }
//     );

//     if (!post) {
//       console.error('Error updating post flags:', postId);
//       return res.status(500).json({ message: 'Error updating post flags' });
//     }

//     // Update post userScore
//     await Post.updateMany({ userId: userId }, { userScore: userScore });

//     // Log updated user and send response
//     console.log('User score updated:', post.comments);
//     console.log("User score updated:", updatedUser.score);
//     res.status(200).json({ message: "Score updated successfully", user: updatedUser });
//   } catch (error) {
//     console.error('Error classifying sentences:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// }

// export default classifyComment;