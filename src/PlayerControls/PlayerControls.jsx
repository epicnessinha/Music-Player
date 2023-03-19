import React from 'react';
import { Button, Stack } from '@mui/material';
import {
  Pause,
  PlayArrow,
  SkipNext,
  SkipPrevious,
  Repeat,
  RepeatOne,
  Shuffle,
} from '@mui/icons-material';

const PlayerControls = ({
  prevSong,
  playPause,
  isPlaying,
  nextSong,
  shuffle,
  handleShuffle,
  repeat,
  handleRepeat,
}) => {
  return (
    <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
      <Button variant="outlined" onClick={prevSong}>
        <SkipPrevious />
      </Button>
      <Button variant="outlined" onClick={playPause}>
        {isPlaying ? <Pause /> : <PlayArrow />}
      </Button>
      <Button variant="outlined" onClick={nextSong}>
        <SkipNext />
      </Button>
      <Button variant="outlined" onClick={handleShuffle}>
        <Shuffle color={shuffle ? 'primary' : 'inherit'} />
      </Button>
      <Button variant="outlined" onClick={handleRepeat}>
        {repeat ? <RepeatOne color="primary" /> : <Repeat />}
      </Button>
    </Stack>
  );
};

export default PlayerControls;
