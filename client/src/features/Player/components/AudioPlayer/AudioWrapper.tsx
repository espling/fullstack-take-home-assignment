import { globalStore } from "../../../../store/global-store";
import AudioPlayer from "./AudioPlayer";

const AudioWrapper = () => {
  const track = globalStore.useStore((state) => state.selectedSong);
  return <>{track && <AudioPlayer track={track} />}</>;
};

export default AudioWrapper;
