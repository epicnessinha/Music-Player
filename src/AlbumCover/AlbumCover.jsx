import React from 'react';
import { Box, CardMedia } from '@mui/material';

const AlbumCover = ({ image, title }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CardMedia
        component="img"
        sx={{
          width: '30%',
          height: 'auto',
          objectFit: 'contain',
        }}
        image={image}
        alt={title}
      />
    </Box>
  );
};

export default AlbumCover;
