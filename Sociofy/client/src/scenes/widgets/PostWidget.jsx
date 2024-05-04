import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  PostAddOutlined,
  ChatBubbleOutlined,
  ChatBubbleOutline,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Input,
  Link,
  Typography,
  useTheme,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import { useNavigate } from "react-router-dom";

const PostWidget = ({
  postId,
  postUserId,
  name,
  communityName,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
  score,
}) => {
  const [isComments, setIsComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const loggedInUserId = user._id;
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const commentCount = Object.keys(comments).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  // comments.map((comment) => {
  //   console.log(comment.flags);
  // });

  // const patchComment = async () => {
  //   // {
  //     // console.log(commentText);
  //   // }
  //   const response = await fetch(
  //     `http://localhost:3001/posts/${postId}/comment`,
  //     {
  //       method: "PATCH",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         userId: loggedInUserId,
  //         text: commentText,
  //         name: user.firstName + user.lastName,
  //         picturePath: user.picturePath,
  //         userId: loggedInUserId
  //       }),
  //     }
  //   );
  //   const updatedPost = await response.json();
  //   console.log("updatedPost",updatedPost);
  //   // updateScore();
  //   dispatch(setPost({ post: updatedPost }));
  //   updateScore();
  // };

  // const updateScore = async () => {
  //   const response = await fetch(
  //     `http://localhost:3001/scores/${loggedInUserId}`,
  //     {
  //       method: "PATCH",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },

  //       body: JSON.stringify(
  //         {
  //           text: commentText,
  //           postId: postId,
  //         }
  //       ),
  //     }
  //   );
  //   const updatedUser = await response.json();
  // }

  const updateScore = async (lastCommentId) => {
    const response = await fetch(
      `http://localhost:3001/scores/${loggedInUserId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: commentText,
          postId: postId,
          lastCommentId: lastCommentId, // Include the last comment ID in the body
        }),
      }
    );
    const updatedUser = await response.json();
  };

  const patchComment = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${postId}/comment`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: loggedInUserId,
          text: commentText,
          name: user.firstName + user.lastName,
          picturePath: user.picturePath,
          userId: loggedInUserId,
        }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    console.log("updatedPost", updatedPost);
    updateScore(updatedPost.comments[updatedPost.comments.length - 1]._id); // Pass the ID of the last comment
  };

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
        score={score}
      />
      <Typography
        component="span" // Use 'span' to render as an inline element
        sx={{
          mt: "1rem",
          display: "inline-block",
          backgroundColor: "#f0f0f0",
          color: "#333",
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          fontSize: "0.875rem",
          fontWeight: 500,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
        }}
      >
        {communityName}
      </Typography>
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              {isComments ? (
                <ChatBubbleOutlined sx={{ color: primary }} />
              ) : (
                <ChatBubbleOutline />
              )}
            </IconButton>
            <Typography>{commentCount}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <>
          <Box display="flex" mt="1rem">
            <Input
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              sx={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
              }}
            />

            <IconButton
              onClick={() => {
                // {
                //   console.log(commentText);
                // }
                patchComment();
                setCommentText("");
              }}
            >
              <PostAddOutlined />
            </IconButton>
          </Box>

          <Box mt="0.5rem">
  {comments.map((comment, i) => (
    <Box key={`${name}-${i}`}>
      <Divider />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          "&:hover": {
            cursor: "pointer",
            backgroundColor: "#f0f0f0",
          },
        }}
        onClick={() => {
          navigate(`/profile/${comment.userId}`);
          navigate(0);
        }}
      >
        <UserImage image={comment.picturePath} size={30} />
        <Typography key={i} sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
          {comment.name}
        </Typography>
      </Box>
      <Box>
        <Typography key={i} sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
          {comment.text}
        </Typography>
        {/* Display flags */}
        {comment.flags && comment.flags.length > 0 && (
          <Box sx={{ pl: "1rem" }}>
            Flags: {comment.flags.join(", ")}
          </Box>
        )}
      </Box>
    </Box>
  ))}
  <Divider />
</Box>



        </>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
