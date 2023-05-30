import { FC } from "react";
import styles from "./styles/PizzaList.module.scss";
import PizzaCard from "../PizzaCard/PizzaCard";
import { Pizza } from "@/interfaces";

const PizzaList: FC<{ pizzaList: [Pizza] }> = ({ pizzaList }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* <PizzaCard pizza={{}} /> */}
        {pizzaList.map((pizza: Pizza) => (
          <PizzaCard pizza={pizza} key={pizza._id} />
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
