import { ChangeEvent, useCallback, useState } from "react";
import { globalStore } from "../../../store/global-store";
import RadioGroup from "../../../components/RadioButton/RadioGroup";
import RadioButton from "../../../components/RadioButton/RadioButton";
import { playListStore } from "../../../features/Playlist/store/playlist-store";
import Dialog from "../../..//components/Dialog/Dialog";

export const DialogAddToPlaylist: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const playLists = playListStore.useStore((state) => state.playLists);

  const addToPlaylist = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLDialogElement> | null) => {
      if (e) {
        const event = e as ChangeEvent<HTMLInputElement>;
        if (selectedOption === event.target.value) {
          setSelectedOption("");
        } else {
          setSelectedOption(event.target.value);
        }

        const selectedTrackToAdd = globalStore.getState().selectedTrackToAdd;

        if (selectedTrackToAdd) {
          const pl = playLists.map((list) => {
            if (list.id === event.target.value) {
              return {
                ...list,
                tracks: [...(list.tracks ?? []), selectedTrackToAdd],
              };
            }
            return list;
          });

          playListStore.setState({
            ...playListStore.getState(),
            playLists: pl,
          });
        }
      }
    },
    [playLists, selectedOption]
  );

  return (
    <>
      <Dialog showModal={false} callback={addToPlaylist}>
        {playLists && (
          <RadioGroup legend={"Add track to playlist"}>
            {playLists.length === 0 && <p>No playlists available</p>}
            {playLists?.map((list) => {
              return (
                <RadioButton
                  key={list.id}
                  id={list.id}
                  name={list.name}
                  value={list.id}
                  labelText={list.name}
                  checked={selectedOption.toString() === list.id}
                  onChange={addToPlaylist}
                />
              );
            })}
          </RadioGroup>
        )}
      </Dialog>
    </>
  );
};
