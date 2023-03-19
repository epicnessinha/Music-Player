import React, { useState, useRef } from "react";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import playlist from "../Playlist/Playlist";
import AlbumCover from "../AlbumCover/AlbumCover";
import SongDetails from "../SongDetails/SongDetails";
import PlayerControls from "../PlayerControls/PlayerControls";
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
          </Grid>
          <Grid item xs={12}>
            <AlbumCover
              image={playlist[currentSongIndex].image}
              title={playlist[currentSongIndex].title}
            />
          </Grid>
          <Grid item xs={12}>
          <div className="details">
            <SongDetails 
              title={playlist[currentSongIndex].title}
              artist={playlist[currentSongIndex].artist}
            />
            </div>
          </Grid>
          <Grid item xs={12}>
            <LinearProgress variant="determinate" value={songProgress} />
          </Grid>
          <Grid item xs={12}>
            <PlayerControls
              prevSong={prevSong}
              playPause={playPause}
              isPlaying={isPlaying}
              nextSong={nextSong}
              shuffle={shuffle}
              handleShuffle={handleShuffle}
              repeat={repeat}
              handleRepeat={handleRepeat}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MusicPlayer;
