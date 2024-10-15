import styles from "./AudioPlayer.module.css";
import {
  ChangeEvent,
  forwardRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from "react";

export const AudioPlayerSlider = forwardRef<
  HTMLAudioElement | null,
  object
>((_props, ref) => {
  const [progress, setProgress] = useState<number>(0);
  const audioRef = ref as MutableRefObject<HTMLAudioElement | null>;

  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime / audioRef.current.duration);
    }
  }, [audioRef]);

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime =
        (parseFloat(e.target.value) / 1000) * audioRef.current.duration;
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, [audioRef, handleTimeUpdate]);

  return (
    <div className={styles.sliderContainer}>
      <input
        type="range"
        min="1"
        max="1000"
        value={progress * 1000}
        className={styles.slider}
        onChange={handleSliderChange}
      />
    </div>
  );
});
