import { useTracks } from "./features/Tracks/hooks/use-tracks";
import { globalStore } from "./store/global-store";
import { Tracks } from "./features/Tracks/components/Tracks";
import { Nav } from "./components/Nav/Nav";
import AudioWrapper from "./features/Player/components/AudioPlayer/AudioWrapper";

function App() {
  const { data } = useTracks();
  return (
    <>
      <Nav>
        {globalStore.useStore((state) => state.selectedTab === 0) && (
          <Tracks tracks={data ?? []} />
        )}
        {globalStore.useStore((state) => state.selectedTab === 1) && (
          <div>test</div>
        )}
      </Nav>
      <AudioWrapper />
    </>
  );
}

export default App;
