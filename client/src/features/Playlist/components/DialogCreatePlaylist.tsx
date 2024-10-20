import style from "../../../components/Dialog/Dialog.module.css";
import { ChangeEvent, useCallback, useState } from "react";
import Dialog from "../../../components/Dialog/Dialog";
import TextField from "../../../components/TextField/TextField";
import { usePlaylistActions } from "../store/usePlaylistActions";
import Button from "../../../components/Button/Button";
import { globalStore } from "../../../store/global-store";

export const DialogCreatePlayList: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");

 globalStore.useStore(
    (state) => state.showCreatePlaylistModal
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  };
  const { createPlaylist } = usePlaylistActions();

  const addNewPlaylist = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLDialogElement> | null) => {
      if (event && event.target instanceof HTMLInputElement) {
        const newValue = event.target.value;
        try {
          if (newValue.length < 3) {
            setError("Playlist name must be at least 3 characters long");
            return false;
          } else {
            setError("");
          }
          createPlaylist(newValue);
          closeDialog();
        } catch (error) {
          console.error("Error creating playlist", error);
          setError("Error creating playlist");
        }
      }
    },
    [createPlaylist]
  );

  const closeDialog = () => {
    const dialogRef = globalStore.getState().dialogRef;

    if (dialogRef?.current) {
      if (dialogRef.current) {
        dialogRef.current.close();
        globalStore.setState({
          ...globalStore.getState(),
          showCreatePlaylistModal: false,
        });
      }
    }
  };

  return (
    <>
      <Dialog showModal={false}>
        <TextField
          id={"PlaylistInputField"}
          label="Name"
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter")
              addNewPlaylist(
                e as unknown as React.ChangeEvent<HTMLInputElement>
              );
          }}
          value={value}
          autoComplete="off"
          errorMsg={error}
          autoFocus
          tabIndex={0}
        />
        <div className={style.actions}>
          <Button
            label={"Submit"}
            title={"Submit and close dialog"}
            onClick={closeDialog}
          />
        </div>
      </Dialog>
    </>
  );
};
