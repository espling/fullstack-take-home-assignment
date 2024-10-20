import React, { memo } from "react";
import styles from "./TrackRow.module.css";
import { Track } from "../types/track";

import { globalStore } from "../../../store/global-store";
import Button from "../../../components/Button/Button";
import { TrackPlayButton } from "./TrackPlayButton";

type TrackRowProps = {
  track: Track;
  updateTrack: (track: Track) => void;
  deleteTrackFromPlaylist: (track: Track) => void;
  openPlaylistModal: (track: Track) => void;
};

const TrackRow: React.FC<TrackRowProps> = ({
  track,
  updateTrack,
  deleteTrackFromPlaylist,
  openPlaylistModal,
}) => {
  globalStore.useStore(
    (state) => state.selectedSong?.id === track.id && state.isPlaying
  );

  return (
    <div>
      <div className={styles.trackRow}>
        <TrackPlayButton track={track} updateTrack={updateTrack} />

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
          <Button
            label={"Add"}
            title={"Add to playlist"}
            onClick={() => openPlaylistModal(track)}
          ></Button>
        )}
        {globalStore.getState().selectedTab > 0 && (
          <Button
            label={"Remove"}
            title={"Remove from playlist"}
            onClick={() => deleteTrackFromPlaylist(track)}
          ></Button>
        )}
      </div>
    </div>
  );
};

export default memo(TrackRow);
