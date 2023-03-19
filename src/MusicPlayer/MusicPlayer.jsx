import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Stack,
  Typography,
  CardMedia,
} from "@mui/material";
import {
  Pause,
  PlayArrow,
  SkipNext,
  SkipPrevious,
  Repeat,
  RepeatOne,
  Shuffle,
} from "@mui/icons-material";
import playlist from "../Playlist/Playlist";

import "./MusicPlayer.css";

const MusicPlayer = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [songProgress, setSongProgress] = useState(0);
  const audioRef = useRef(null);

  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    if (shuffle) {
      setCurrentSongIndex(Math.floor(Math.random() * playlist.length));
    } else {
      setCurrentSongIndex((currentSongIndex + 1) % playlist.length);
    }
    resetProgress();
  };

  const prevSong = () => {
    if (shuffle) {
      setCurrentSongIndex(Math.floor(Math.random() * playlist.length));
    } else {
      setCurrentSongIndex(
        (currentSongIndex - 1 + playlist.length) % playlist.length
      );
    }
    resetProgress();
  };

  const updateProgress = (e) => {
    setSongProgress((e.target.currentTime / e.target.duration) * 100);
  };

  const resetProgress = () => {
    setSongProgress(0);
  };

  const handleRepeat = () => {
    setRepeat(!repeat);
  };

  const handleShuffle = () => {
    setShuffle(!shuffle);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={playlist[currentSongIndex].src}
        onTimeUpdate={updateProgress}
        onEnded={() => {
          if (repeat) {
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          } else {
            nextSong();
          }
        }}
      ></audio>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              <div className="music">Music Player</div>
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CardMedia
                component="img"
                sx={{
                  width: "30%",
                  height: "auto",
                  objectFit: "contain",
                }}
                image={playlist[currentSongIndex].image}
                alt={playlist[currentSongIndex].title}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" align="center">
              {playlist[currentSongIndex].title}
            </Typography>
            <Typography variant="subtitle1" align="center">
              {playlist[currentSongIndex].artist}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <LinearProgress variant="determinate" value={songProgress} />
          </Grid>
          <Grid item xs={12}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
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
                <Shuffle color={shuffle ? "primary" : "inherit"} />
              </Button>
              <Button variant="outlined" onClick={handleRepeat}>
                {repeat ? <RepeatOne color="primary" /> : <Repeat />}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MusicPlayer;
