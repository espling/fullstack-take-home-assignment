import { useEffect, useState } from "react";
import { Track } from "../types/track.ts";
import { getTracks } from "../lib/get-tracks.ts";

export function useTracks() {
  const [data, setData] = useState<Track[] | null>();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const abortController = new AbortController();

    getTracks(abortController.signal)
      .then((response: Track[] | null) => {
        const data = response || [];
        console.log("🚀 ~ .then ~ data:", data)
        setData(data);
        // setIsLoading(false);
      })
      .catch((err) => {
        if (!abortController.signal.aborted) {
          setError(err);
          setIsLoading(false);
        }
      });
    return () => abortController.abort();
  }, []);

  return {
    isLoading,
    error,
    data,
  };
}
