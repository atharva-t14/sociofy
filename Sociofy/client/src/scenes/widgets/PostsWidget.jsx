import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:3001/posts", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.error("Error fetching posts:", error);
      // Dispatch an action to handle the error (optional)
      // You can set posts to an empty array here if needed
    }
  };

  const getUserPosts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${userId}/posts`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.error("Error fetching user posts:", error);
      // Dispatch an action to handle the error (optional)
      // You can set posts to an empty array here if needed
    }
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(posts[0]._id)

  return (
    <>
      {posts.length > 0 && ( // Check if there are posts before mapping
        <>
          {posts.map(
            ({
              _id,
              userId,
              firstName,
              lastName,
              communityName,
              description,
              location,
              picturePath,
              userPicturePath,
              likes,
              comments,
              userScore,
            }) => (
              <PostWidget
                key={_id}
                postId={_id}
                postUserId={userId}
                communityName={communityName}
                name={`${firstName} ${lastName}`}
                description={description}
                location={location}
                picturePath={picturePath}
                userPicturePath={userPicturePath}
                likes={likes}
                comments={comments}
                score={userScore}
              />
            )
          )}
        </>
      )}
    </>
  );
};

export default PostsWidget;
