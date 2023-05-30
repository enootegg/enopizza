import { FC } from "react";
import styles from "./styles/BurgerMenu.module.scss";

const BurgerMenu: FC = () => {
  return (
    <nav role="navigation">
      <div className={styles.menuToggle}>
        <input type="checkbox" />

        <span></span>
        <span></span>
        <span></span>

        <div className={styles.menu}>тест</div>
      </div>
    </nav>
  );
};

export default BurgerMenu;
