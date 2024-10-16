import { Track } from "../types/track";
import TrackRow from "./TrackRow";
import { playListStore } from "../../../features/Playlist/store/playlist-store";
import { usePlaylistActions } from "../../Playlist/store/usePlaylistActions";

type TrackProps = {
  tracks: Track[];
};

export const Tracks: React.FC<TrackProps> = ({ tracks }) => {
  const { deleteTrackFromPlaylist, updateTrack, openPlaylistModal } =
    usePlaylistActions();

  playListStore.useStore((state) => state.playLists);

  return (
    <>
      {tracks &&
        tracks?.map((track, ix) => (
          <TrackRow
            key={ix}
            track={track}
            updateTrack={updateTrack}
            deleteTrackFromPlaylist={deleteTrackFromPlaylist}
            openPlaylistModal={openPlaylistModal}
          />
        ))}
    </>
  );
};
