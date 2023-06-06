import React, { useState, useRef } from "react";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const isReadyToPlay = useRef(false);

  const handlePlayPause = () => {
    if (!isReadyToPlay.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const handleCanPlay = () => {
    isReadyToPlay.current = true;
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <div>
      <audio ref={audioRef} onCanPlay={handleCanPlay}>
        <source
          src={process.env.PUBLIC_URL + "/Assets/Music/lofi01.mp3"}
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>

      {isPlaying ? (
        <button onClick={handlePlayPause}>Pause</button>
      ) : (
        <button onClick={handlePlayPause}>Play</button>
      )}
    </div>
  );
};

export default MusicPlayer;
