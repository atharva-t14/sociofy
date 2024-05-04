import React from 'react';
import { CircularProgress, Typography } from '@mui/material';

const ScoreCircle = ({ score }) => {
  // Calculate percentage based on score
  const percent = ((score - 5) / (95 - 5)) * 100;

  return (
    <div style={{ position: 'relative', width: 100, height: 100 }}>
      <CircularProgress
        variant="determinate"
        value={score}
        size={100}
        thickness={5}
        sx={{
          color: (theme) => (percent >= 50 ? theme.palette.success.main : theme.palette.error.main),
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
      <Typography
        variant="h6"
        component="div"
        textAlign="center"
        sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        {score}
      </Typography>
    </div>
  );
};

export default ScoreCircle;
