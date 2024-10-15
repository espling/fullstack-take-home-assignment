import { useCallback } from "react";
import { globalStore } from "../../../store/global-store";
import { Track } from "../types/track";
import TrackRow from "./TrackRow";

type TrackProps = {
  tracks: Track[];
};

export const Tracks: React.FC<TrackProps> = ({ tracks }) => {
  const updateTrack = useCallback((track: Track) => {
    globalStore.setState({
      ...globalStore.getState(),
      selectedSong: track,
    });
  }, []);

  return (
    <>
      {tracks &&
        tracks?.map((track, ix) => (
          <TrackRow key={ix} track={track} updateTrack={updateTrack} />
        ))}
    </>
  );
};
