import { memo } from "react";
import styles from "../../App.module.css";
import { globalStore } from "../../store/global-store";

type NavButtonProps = {
  name: string;
  tab: number;
  handleTabChange: (tab: number) => void;
};

const NavButton: React.FC<NavButtonProps> = ({
  name,
  tab,
  handleTabChange,
}) => {
  return (
    <a
      href="#"
      role="button"
      className={
        globalStore.useStore((state) => state.selectedTab === tab)
          ? styles.active
          : undefined
      }
      onClick={() => handleTabChange(tab)}
    >
      {name}
    </a>
  );
};

export default memo(NavButton);
