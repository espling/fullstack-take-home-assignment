import styles from "../../App.module.css";
import { globalStore } from "../../store/global-store";

import { memo } from "react";

type NavButtonProps = {
  label: string;
  tab: number;
};

const NavButton: React.FC<NavButtonProps> = ({ label, tab }) => {
  const handleTabChange = (tab: number) => {
    globalStore.setState({
      ...globalStore.getState(),
      selectedTab: tab,
    });
  };
  return (
    <a
      href="#"
      className={
        globalStore.useStore((state) => state.selectedTab === tab)
          ? styles.active
          : undefined
      }
      onClick={() => handleTabChange(tab)}
    >
      {label}
    </a>
  );
};

export default memo(NavButton);
