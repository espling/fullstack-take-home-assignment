import { useCallback } from "react";
import { globalStore } from "../../../store/global-store";
import { Track } from "../types/track";
import TrackRow from "./TrackRow";
import { playListStore } from "../../../features/Playlist/store/playlist-store";

type TrackProps = {
  tracks: Track[];
};

export const Tracks: React.FC<TrackProps> = ({ tracks }) => {
  playListStore.useStore((state) => state.playLists);
  const updateTrack = useCallback((track: Track) => {
    globalStore.setState({
      ...globalStore.getState(),
      selectedSong: track,
    });
  }, []);

  const openPlaylistModal = useCallback((track: Track) => {
    globalStore.setState({
      ...globalStore.getState(),
      selectedTrackToAdd: track,
    });

    globalStore.setState({
      ...globalStore.getState(),

      showPlaylistModal: true,
    });
  }, []);

  return (
    <>
      {tracks &&
        tracks?.map((track, ix) => (
          <TrackRow
            key={ix}
            track={track}
            updateTrack={updateTrack}
            openPlaylistModal={openPlaylistModal}
          />
        ))}
    </>
  );
};
