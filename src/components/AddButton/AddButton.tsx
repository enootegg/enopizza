import { FC } from "react";
import styles from "./styles/AddButton.module.scss";

const AddButton: FC<{ setClose: any }> = ({ setClose }) => {
  return (
    <div className={styles.mainAddButton} onClick={() => setClose(false)}>
      Додати піцу
    </div>
  );
};

export default AddButton;
