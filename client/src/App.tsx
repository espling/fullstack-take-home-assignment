import { useTracks } from "./features/Tracks/hooks/use-tracks";
import styles from "./App.module.css";
import { globalStore } from "./store/global-store";
import { Tracks } from "./features/Tracks/components/Tracks";
import { Nav } from "./components/Nav/Nav";
import AudioWrapper from "./features/Player/components/AudioPlayer/AudioWrapper";
import { PlayListPage } from "./features/Playlist/components/PlayListPage";
import { DialogAddToPlaylist } from "./features/Tracks/components/DialogAddToPlaylist";
import { useInitStore } from "./features/Tracks/hooks/use-init-store";
import { DialogCreatePlayList } from "./features/Playlist/components/DialogCreatePlaylist";
import { useEffect, useRef } from "react";

function App() {
  const { data } = useTracks();
  useInitStore();
  globalStore.useStore((state) => state.showPlaylistModal);
  globalStore.useStore((state) => state.showCreatePlaylistModal);

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!globalStore.getState().dialogRef) {
      globalStore.setState({
        ...globalStore.getState(),
        dialogRef,
      });
    }
  }, []);

  const selectedTab = globalStore.useStore((state) => state.selectedTab);
  return (
    <div className={styles.app}>
      <Nav>
        {selectedTab === 0 && <Tracks tracks={data ?? []} />}
        {selectedTab > 0 && <PlayListPage />}
      </Nav>
      <AudioWrapper />
      {globalStore.getState().showPlaylistModal && <DialogAddToPlaylist />}
      {globalStore.getState().showCreatePlaylistModal && (
        <DialogCreatePlayList />
      )}
    </div>
  );
}

export default App;
