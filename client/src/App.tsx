import { useEffect } from 'react'
import styles from "./App.module.css";
import logo from "./assets/logo.svg";

import { useTracks } from './features/Tracks/hooks/use-tracks'
import TrackRow from './features/Tracks/components/TrackRow';

function App() {
  const { data } = useTracks();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handlePlay = () => {
    return null;
  };


  return (
    <>
      <main className={styles.app}>
        <nav>
          <img src={logo} className={styles.logo} alt="Logo" />
          <ul className={styles.menu}>
            <li>
              <a href="#" className={styles.active}>
                Tracks
              </a>
            </li>
            <li>
              <a href="#">Playlists</a>
            </li>
          </ul>
        </nav>
        {data?.map((track, ix) => (
          <TrackRow key={ix} track={track} handlePlay={handlePlay} />
        ))}
      </main>
      {/* {currentTrack && <AudioPlayer track={currentTrack} />} */}
    </>
  )
}

export default App
