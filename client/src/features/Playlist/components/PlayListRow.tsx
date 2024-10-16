import React from "react";
import styles from "./PlayList.module.css";
// import { PlayIcon } from "../../../icons/PlayIcon";
// import { PauseIcon } from "../../../icons/PauseIcon";
// import { globalStore } from "../../../store/global-store";
// import { playListStore } from "../store/playlist-store";

import { PlayList } from "../types/playlist";
import { MusicIcon } from "../../../icons/MusicIcon";

type PlayListRowProps = {
  list: PlayList;
  deleteList: (list: PlayList) => void;
};

const PlayListRow: React.FC<PlayListRowProps> = ({ list, deleteList }) => {
  // const isPlaying = globalStore.useStore((state) => state.selectedSong === track);

  return (
    <div className={styles.trackRow}>
      <MusicIcon />
      <div className={styles.trackInfo}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div className={styles.trackTitle}>{list.name}</div>
        </div>
      </div>
      <button
        className={styles.trackPlay}
        title="Play song"
        onClick={() => deleteList(list)}
      >
        {/* {!isPlaying ? <PlayIcon /> : <PauseIcon />} */}
      </button>
    </div>
  );
};

export default PlayListRow;
