import styles from "./AudioPlayer.module.css";
import { PlayIcon } from "../../../..//icons/PlayIcon";
import { PauseIcon } from "../../../../icons/PauseIcon";

type Props = {
  isPlaying: boolean;
  handleTogglePlaybackClick: () => void;
};

export const AudioPlayButton: React.FC<Props> = ({
  isPlaying,
  handleTogglePlaybackClick,
}) => {
  return (
    <button
      title="Toggle playback"
      className={styles.togglePlaybackButton}
      onClick={handleTogglePlaybackClick}
    >
      {!isPlaying ? <PlayIcon /> : <PauseIcon />}
    </button>
  );
};
