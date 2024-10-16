import React from "react";
import styles from "./TrackRow.module.css";
import { Track } from "../types/track";
import { PlayIcon } from "../../../icons/PlayIcon";
import { PauseIcon } from "../../../icons/PauseIcon";
import { globalStore } from "../../../store/global-store";

type TrackRowProps = {
  track: Track;
  updateTrack: (track: Track) => void;
  deleteTrackFromPlaylist: (track: Track) => void;
  isPlaying?: boolean;
  openPlaylistModal: (track: Track) => void;
};

const TrackRow: React.FC<TrackRowProps> = ({
  track,
  updateTrack,
  deleteTrackFromPlaylist,
  openPlaylistModal,
}) => {
  const isPlaying = globalStore.useStore(
    (state) => state.selectedSong === track
  );

  return (
    <div>
      <div className={styles.trackRow}>
        <button
          className={styles.trackPlay}
          title="Play song"
          onClick={() => updateTrack(track)}
        >
          {!isPlaying ? <PlayIcon /> : <PauseIcon />}
        </button>
        <div className={styles.trackInfo}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className={styles.trackTitle}>{track.title}</div>
          </div>
          <div className={styles.trackArtist}>
            {track.main_artists.join(", ")}
          </div>
        </div>
        {globalStore.getState().selectedTab === 0 && (
          <button
            title="Add to playlist"
            onClick={() => openPlaylistModal(track)}
          >
            Add
          </button>
        )}
        {globalStore.getState().selectedTab > 1 && (
          <button
            title="Remove from playlist"
            onClick={() => deleteTrackFromPlaylist(track)}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default TrackRow;
