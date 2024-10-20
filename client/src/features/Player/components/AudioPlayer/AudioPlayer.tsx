import React, { useEffect } from "react";
import styles from "./AudioPlayer.module.css";
import { Track } from "../../../Tracks/types/track";
import { AudioPlayerSlider } from "./AudioPlayerSlider";
import { usePlayer } from "../../hooks/usePlayer";
import { AudioPlayButton } from "./AudioPlayButton";
import { AudioPlayerInfo } from "./AudioPlayerInfo";

type AudioPlayer = {
  track: Track;
  audioRef: React.RefObject<HTMLAudioElement | null>;
};

const AudioPlayer: React.FC<AudioPlayer> = ({ track, audioRef }) => {
  const { handleTogglePlaybackClick, isPlaying } = usePlayer({
    track,
  });

  useEffect(() => {
    console.log("test");
  }, []);

  return (
    <>
      <div className={styles.audioPlayer}>
        <AudioPlayButton
          isPlaying={isPlaying}
          handleTogglePlaybackClick={handleTogglePlaybackClick}
        />
        <AudioPlayerInfo track={track} />
        <AudioPlayerSlider ref={audioRef} />
      </div>
    </>
  );
};

export default AudioPlayer;
