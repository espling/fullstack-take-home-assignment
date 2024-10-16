import "./Dialog.module.css";
import { useRef, FC, useEffect, ChangeEvent } from "react";
import { globalStore } from "../../store/global-store";

type DialogProps = {
  children: React.ReactNode;
  showModal: boolean;
  callback?: (event: ChangeEvent<HTMLInputElement> | null) => void;
};

const Dialog: FC<DialogProps> = ({ children, callback }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const showModal = globalStore.useStore((state) => state.showPlaylistModal);

  useEffect(() => {
    if (dialogRef.current && showModal) {
      dialogRef.current.showModal();
    }
  }, [showModal]);

  const handleClose = () => {
    globalStore.setState({
      ...globalStore.getState(),
      showPlaylistModal: false,
    });

    if (callback) callback();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.addEventListener("close", handleClose);

      return () => {
        dialog.removeEventListener("close", handleClose);
      };
    }
  }, []);

  const closeDialog = () => {
    if (dialogRef.current) {
      if (dialogRef.current && showModal) {
        dialogRef.current.close();
      }
    }
  };

  return (
    <div className="App">
      <dialog id="dialog" ref={dialogRef}>
        {children}
        <button id="close" onClick={closeDialog}>
          Close
        </button>
      </dialog>
    </div>
  );
};

export default Dialog;
