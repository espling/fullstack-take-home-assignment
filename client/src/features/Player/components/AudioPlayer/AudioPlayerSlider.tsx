import styles from "./AudioPlayer.module.css";
import { forwardRef, MutableRefObject } from "react";

import { useAudioSlider } from "../../hooks/useAudioSlider";

export const AudioPlayerSlider = forwardRef<HTMLAudioElement | null, object>(
  (_props, ref) => {
    const audioRef = ref as MutableRefObject<HTMLAudioElement | null>;
    const { progress, handleSliderChange } = useAudioSlider({ audioRef });
    return (
      <div className={styles.sliderContainer}>
        <input
          type="range"
          min="1"
          role="progressbar"
          max="1000"
          value={progress * 1000}
          className={styles.slider}
          onChange={handleSliderChange}
        />
      </div>
    );
  }
);
