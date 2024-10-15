import { useEffect, useState } from "react";
import styles from "./App.module.css";
import logo from "./assets/logo.svg";

import { useTracks } from "./features/Tracks/hooks/use-tracks";
import TrackRow from "./features/Tracks/components/TrackRow";

function App() {
  const { data } = useTracks();
  const [activeTab, setActiveTab] = useState(0);
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
              <a
                href="#"
                className={activeTab === 0 ? styles.active : undefined}
                onClick={() => setActiveTab(0)}
              >
                Tracks
              </a>
            </li>
            <li>
              <a href="#" 
                className={activeTab === 1 ? styles.active : undefined}
              
              onClick={() => setActiveTab(1)}>
                Playlists
              </a>
            </li>
          </ul>
        </nav>
        {activeTab === 0 &&
          data &&
          data?.map((track, ix) => (
            <TrackRow key={ix} track={track} handlePlay={handlePlay} />
          ))}
          {activeTab === 0 && (<div>test</div>)}
      </main>
      {/* {currentTrack && <AudioPlayer track={currentTrack} />} */}
    </>
  );
}

export default App;
