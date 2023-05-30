import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles/PizzaCard.module.scss";

const PizzaCardOld: FC<{ pizza: any }> = ({ pizza }) => {
  return (
    <div className={styles.container}>
      <Link href={`/products/${pizza._id}`} passHref>
        <Image src={pizza.img} alt="" width="200" height="200" />
      </Link>
      <h1 className={styles.title}>{pizza.title}</h1>
      <span className={styles.price}>${pizza.prices[0]}</span>
      <p className={styles.desc}>{pizza.desc}</p>
    </div>
  );
};

export default PizzaCardOld;
