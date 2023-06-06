import React from "react";
import audioFile from '../assets/music.mp3'

// audio file이 src 내부에 위치해야 함
const MusicPlayer = () => {
  return (
    <div>
      <audio autoPlay controls>
        <source src={audioFile} type="audio/mpeg"/>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default MusicPlayer;
