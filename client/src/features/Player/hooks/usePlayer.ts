import { useEffect } from "react";
import { globalStore } from "../../../store/global-store";
import { Track } from "../../../features/Tracks/types/track";

type UsePlayerProps = {
  track: Track;
};

export const usePlayer = ({ track }: UsePlayerProps) => {
  globalStore.useStore((state) => state.isPlaying);

  const handleTogglePlaybackClick = () => {
    const ref = globalStore.getState().audioRef;
    if (ref?.current) {
      if (ref.current.paused) {
        ref.current.play();
      } else {
        ref.current.pause();
      }

      globalStore.setState({
        ...globalStore.getState(),
        isPlaying: !globalStore.getState().isPlaying,
      });
    }
  };

  useEffect(() => {
    const audioRef = globalStore.getState().audioRef?.current;
    if (audioRef && track) {
      audioRef.play();
      audioRef.currentTime = 0;
    }
  }, [track]);

  return {
    handleTogglePlaybackClick,
    isPlaying: globalStore.getState().isPlaying,
  };
};
