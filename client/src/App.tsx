import { useTracks } from "./features/Tracks/hooks/use-tracks";
import { globalStore } from "./store/global-store";
import { Tracks } from "./features/Tracks/components/Tracks";
import { Nav } from "./components/Nav/Nav";
import AudioWrapper from "./features/Player/components/AudioPlayer/AudioWrapper";
import { PlayListPage } from "./features/Playlist/components/PlayListPage";
import { DialogAddToPlaylist } from "./features/Tracks/components/DialogAddToPlaylist";
import { useInitStore } from "./features/Tracks/hooks/use-playlists";

function App() {
  const { data } = useTracks();
  useInitStore();
  globalStore.useStore((state) => state.showPlaylistModal);
  return (
    <>
      <Nav>
        {globalStore.useStore((state) => state.selectedTab === 0) && (
          <Tracks tracks={data ?? []} />
        )}
        {globalStore.useStore((state) => state.selectedTab > 1) && (
          <PlayListPage />
        )}
      </Nav>
      <AudioWrapper />
      {globalStore.getState().showPlaylistModal && <DialogAddToPlaylist />}
    </>
  );
}

export default App;
