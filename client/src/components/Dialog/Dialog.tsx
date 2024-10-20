import { FC, useEffect, ChangeEvent, useCallback } from "react";
import { globalStore } from "../../store/global-store";

type DialogProps = {
  children: React.ReactNode;
  showModal: boolean;
  callback?: (
    event: ChangeEvent<HTMLInputElement | HTMLDialogElement> | null
  ) => void;
};

const Dialog: FC<DialogProps> = ({ children, callback }) => {
  const dialogRef = globalStore.useStore((state) => state.dialogRef);
  const showPlayListModal = globalStore.useStore(
    (state) => state.showPlaylistModal
  );
  const showCreatePlayListModal = globalStore.useStore(
    (state) => state.showCreatePlaylistModal
  );

  useEffect(() => {
    if (dialogRef?.current && (showPlayListModal || showCreatePlayListModal)) {
      dialogRef.current.showModal();
    }
  }, [dialogRef, showCreatePlayListModal, showPlayListModal]);

  const handleClose = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLDialogElement> | null) => {
        globalStore.setState({
        ...globalStore.getState(),
        selectedTrackToAdd: null,
        showPlaylistModal: false,
        showCreatePlaylistModal: false,
        selectedPlaylistId: "",
        selectedTab: 0,
      });
      if (callback) callback(event);
    },
    [callback]
  );

  useEffect(() => {
    const dialog = dialogRef?.current;
    if (dialog) {
      dialog.addEventListener("close", () => handleClose(null));

      return () => {
        dialog.removeEventListener("close", () => handleClose(null));
      };
    }
  }, [dialogRef, handleClose]);

  return (
    <>
      <dialog id="dialog" ref={dialogRef}>
        {children}
      </dialog>
    </>
  );
};

export default Dialog;
