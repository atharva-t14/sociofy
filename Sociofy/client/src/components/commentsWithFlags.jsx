import { Typography, Box, Divider } from "@mui/material";

const CommentWithFlags = ({ comment }) => {
  const { text, flags } = comment;

  // Check if the comment has flags
  const hasFlags = flags && flags.length > 0;

  return (
    <Box key={comment._id}>
      <Divider />
      <Typography sx={{ fontWeight: "bold", color: hasFlags ? "red" : "inherit" }}>
        {text}
      </Typography>
      {hasFlags && (
        <Typography variant="body2" color="red">
          Flags: {flags.join(", ")}
        </Typography>
      )}
    </Box>
  );
};

export default CommentWithFlags;
