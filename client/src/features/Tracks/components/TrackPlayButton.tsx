import styles from "./TrackRow.module.css";
import { PlayIcon } from "../../../icons/PlayIcon";
import { PauseIcon } from "../../../icons/PauseIcon";
import { globalStore } from "../../../store/global-store";
import { Track } from "../types/track";

type Props = {
  track: Track;
  updateTrack: (track: Track) => void;
};

export const TrackPlayButton: React.FC<Props> = ({ track, updateTrack }) => {
  const isPlaying = globalStore.useStore(
    (state) => state.isPlaying && state.selectedSong?.id === track.id
  );

  return (
    <button
      className={styles.trackPlay}
      title={`${!isPlaying ? "Play" : "Pause"} song`}
      onClick={() => updateTrack(track)}
    >
      {!isPlaying ? <PlayIcon /> : <PauseIcon />}
    </button>
  );
};
