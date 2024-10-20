import { Track } from "../types/track";
import TrackRow from "./TrackRow";
import { playListStore } from "../../../features/Playlist/store/playlist-store";
import { usePlaylistActions } from "../../Playlist/store/usePlaylistActions";
// import { globalStore } from "../../../store/global-store";

type TrackProps = {
  tracks: Track[];
};

export const Tracks: React.FC<TrackProps> = ({ tracks }) => {
  const { deleteTrackFromPlaylist, updateTrack, openPlaylistModal } =
    usePlaylistActions();

  playListStore.useStore((state) => state.playLists);

  // globalStore.useStore((state) => state.selectedSong);

  return (
    <>
      {tracks &&
        tracks?.map((track) => (
          <TrackRow
            key={track.id}
            track={track}
            updateTrack={updateTrack}
            deleteTrackFromPlaylist={deleteTrackFromPlaylist}
            openPlaylistModal={openPlaylistModal}
          />
        ))}
    </>
  );
};
