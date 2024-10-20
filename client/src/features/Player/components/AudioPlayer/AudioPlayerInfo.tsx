import styles from "./AudioPlayer.module.css";
import { Track } from "../../../Tracks/types/track";

type Props = {
  track: Track;
};

export const AudioPlayerInfo: React.FC<Props> = ({ track }) => {
  return (
    <div className={styles.trackInfo}>
      <div className={styles.trackTitle}>{track.title}</div>
      <div className={styles.trackArtist}>{track.main_artists.join(", ")}</div>
    </div>
  );
};
