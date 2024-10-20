import { useEffect, useRef } from "react";
import { globalStore } from "../../../../store/global-store";
import AudioPlayer from "./AudioPlayer";

const AudioWrapper = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!globalStore.getState().audioRef) {
      globalStore.setState({
        ...globalStore.getState(),
        audioRef,
      });
    }
  }, []);

  const track = globalStore.useStore((state) => state.selectedSong);

  return (
    <>
      {audioRef && track && <audio ref={audioRef} src={track?.audio} />}
      {track && <AudioPlayer track={track} audioRef={audioRef} />}
    </>
  );
};

export default AudioWrapper;
