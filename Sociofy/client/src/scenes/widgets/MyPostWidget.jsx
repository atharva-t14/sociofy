import React, { useState } from 'react';
import { Box, InputBase, Divider, Button } from '@mui/material';
import styled from 'styled-components';

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WidgetWrapper = styled.div`
  background-color: #f5f5f5;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
`;

const PostContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5deb3;
  background-image: linear-gradient(to bottom right, #f5deb3, #ffc107);
`;

const PostButton = styled(Button)`
  &:hover {
    background-color: #0056b3;
  }
`;

const MyPostWidget = ({ userId }) => {
  const [post, setPost] = useState("");
  const [communityName, setCommunityName] = useState("Miscellaneous");

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("description", post);
    formData.append("communityName", communityName);

    // Send formData to backend using fetch or axios
    try {
      const response = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error posting:', error);
    }
  };

  return (
    <PostContainer>
      <WidgetWrapper>
        <FlexBetween gap="1.5rem">
          <InputBase
            placeholder="What's on your mind..."
            onChange={(e) => setPost(e.target.value)}
            value={post}
            sx={{
              width: '100%',
              backgroundColor: '#fff',
              borderRadius: '2rem',
              padding: '1rem 2rem',
            }}
          />
        </FlexBetween>
        <Divider sx={{ margin: '1.25rem 0' }} />
        <FlexBetween>
          <PostButton
            disabled={!post}
            onClick={handlePost}
            sx={{
              color: '#fff',
              backgroundColor: '#007bff',
              borderRadius: '3rem',
            }}
          >
            POST
          </PostButton>
        </FlexBetween>
      </WidgetWrapper>
    </PostContainer>
  );
}

export default MyPostWidget;
