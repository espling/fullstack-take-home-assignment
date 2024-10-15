import styles from "../../App.module.css";
import logo from "../../assets/logo.svg";
import NavButton from "./NavButton";

type NavProps = {
  children: React.ReactNode;
};

export const Nav: React.FC<NavProps> = ({ children }) => {
  return (
    <>
      <main className={styles.app}>
        <nav>
          <img src={logo} className={styles.logo} alt="Logo" />
          <ul className={styles.menu}>
            <li>
              <NavButton label="Tracks" tab={0} />
            </li>
            <li>
              <NavButton label="Playlists" tab={1} />
            </li>
          </ul>
        </nav>
        {children}
      </main>
    </>
  );
};
