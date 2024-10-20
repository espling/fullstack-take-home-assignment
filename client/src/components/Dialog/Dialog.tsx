import "./Dialog.module.css";
import { useRef, FC, useEffect, ChangeEvent, useCallback } from "react";
import { globalStore } from "../../store/global-store";
import Button from "../Button/Button";

type DialogProps = {
  children: React.ReactNode;
  showModal: boolean;
  callback?: (
    event: ChangeEvent<HTMLInputElement | HTMLDialogElement> | null
  ) => void;
};

const Dialog: FC<DialogProps> = ({ children, callback }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const showModal = globalStore.useStore((state) => state.showPlaylistModal);

  useEffect(() => {
    if (dialogRef.current && showModal) {
      dialogRef.current.showModal();
    }
  }, [showModal]);

  const handleClose = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLDialogElement> | null) => {
      globalStore.setState({
        ...globalStore.getState(),
        selectedTrackToAdd: null,
        showPlaylistModal: false,
        selectedPlaylistId: "",
      });
      if (callback) callback(event);
    },
    [callback]
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.addEventListener("close", () => handleClose(null));

      return () => {
        dialog.removeEventListener("close", () => handleClose(null));
      };
    }
  }, [handleClose]);

  const closeDialog = () => {
    if (dialogRef.current) {
      if (dialogRef.current && showModal) {
        dialogRef.current.close();
      }
    }
  };

  return (
    <>
      <dialog id="dialog" ref={dialogRef}>
        {children}
        <Button label={"OK"} title={"Close dialog"} onClick={closeDialog} />
      </dialog>
    </>
  );
};

export default Dialog;
