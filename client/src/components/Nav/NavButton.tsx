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
  const selected = globalStore.useStore((state) => state.selectedTab === tab)
  return (
    <a
      href="#"
      aria-selected={selected}
      role="button"
      title={name}
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
