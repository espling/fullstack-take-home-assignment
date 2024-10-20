import { useCallback, useEffect, useState, ChangeEvent } from "react";

type UseAudioSliderProps = {
  audioRef: React.RefObject<HTMLAudioElement>;
};

export const useAudioSlider = ({ audioRef }: UseAudioSliderProps) => {
  const [progress, setProgress] = useState<number>(0);

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

  return {
    handleSliderChange,
    progress,
    setProgress,
  };
};
