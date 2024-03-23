import { useTheme } from "@emotion/react";
import WidgetWrapper from "components/WidgetWrapper";
import PostWidget from "../widgets/PostWidget";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import { useParams } from "react-router-dom";
import { Typography, Box, useMediaQuery } from "@mui/material";
import Navbar from "scenes/navbar";

function CommunityPosts() {
  const { communityName } = useParams(); // Extract communityName from URL
  const token = useSelector((state) => state.token);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  

  const getCommunityPosts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/posts/${communityName}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCommunityPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Navbar />
      <Box
        sx={{
          m: "1.5rem",
          padding: isNonMobileScreens ? "2rem 25%" : " 0.5rem 5%",
          backgroundColor: "white",
        }}
      >
        <Typography color={palette.primary.main} fontSize={40}>
          {communityName}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          padding: isNonMobileScreens ? "2rem 25%" : " 0.5rem 5%",
          width: "100%",
        }}
      >
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
            />
          )
        )}
      </Box>
    </>
  );
}

export default CommunityPosts;
