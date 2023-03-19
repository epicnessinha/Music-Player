import React from 'react';
import { Typography } from '@mui/material';

const SongDetails = ({ title, artist }) => {
  return (
    <>
      <Typography variant="h6" align="center">
        {title}
      </Typography>
      <Typography variant="subtitle1" align="center">
        {artist}
      </Typography>
    </>
  );
};

export default SongDetails;
