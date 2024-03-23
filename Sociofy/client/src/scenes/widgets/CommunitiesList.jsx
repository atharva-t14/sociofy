
  // const getCommunityPosts = async () => {
  //     const response = await fetch(
  //       `http://localhost:3001/posts/${communityName}/friends`,
  //       {
  //         method: "GET",
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );
  //     const data = await response.json();
  //   };

  //   useEffect(() => {
  //     getCommunityPosts();
  //   }, []);

  import WidgetWrapper from "components/WidgetWrapper";
  import { communityNames } from "data/data";
  import React from "react";
  import { Box, Typography, useTheme, Link, useMediaQuery } from "@mui/material";
  
  function CommunitiesList() {
    const { palette } = useTheme();
    
  
    return (
      <WidgetWrapper>
        <Typography
          color={palette.neutral.dark}
          variant="h5"
          fontWeight="500"
          sx={{ mb: "1.2rem" }} // MUI styling for margin bottom
        >
          CommunitiesList
        </Typography>
        <Box display="flex" flexDirection="column">
          {communityNames.map((community, index) => (
            <Box
              key={community}
              sx={{
                // MUI styling for link container
                "&:hover": {
                  backgroundColor: palette.action.hover,
                },
                // Apply margin to create space between community names
                mb: index !== communityNames.length - 1 ? "0.5rem" : 0,
              }}
            >
               <Link href={`/community-posts/${community}`} sx={{ color: 'inherit', textDecoration: 'inherit' }}>
                <Typography
                 
                  variant="h5"
        fontWeight="500"
                  sx={{
                    // MUI styling for typography
                    

                    textDecoration: "none", // Remove underline from link text
                    color: palette.primary.main, // Link text color
                    "&:hover": {
                      color: palette.primary.dark, // Link text color on hover
                    },
                  }}
                >
                  {community}
                </Typography>
              </Link>
            </Box>
          ))}
        </Box>
      </WidgetWrapper>
    );
  }
  
  export default CommunitiesList;
  