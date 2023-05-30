import { FC, useState } from "react";
import styles from "./styles/Features.module.scss";
import Image from "next/image";
import { VeryTasty, Aromatic, Memory, Classic } from "../Icons/FeaturesIcons";
import Link from "next/link";
import { Pizza } from "@/interfaces";

const Features: FC<{ pizzaList: [Pizza] }> = ({ pizzaList }) => {
  const [index, setIndex] = useState(0);

  const changeIndex = (num: number) => {
    if (num >= pizzaList.length) {
      setIndex(0);
    } else {
      setIndex(num);
    }
  };

  return (
    <div className={styles.container}>
      <VeryTasty
        width={120}
        height={120}
        className={styles.veryTastyIcon}
        color={"#000"}
      />
      <Aromatic
        width={130}
        height={130}
        className={styles.aromatic}
        color={"#000"}
      />
      <Memory
        width={150}
        height={150}
        className={styles.memory}
        color={"#000"}
      />
      <Classic
        width={160}
        height={160}
        className={styles.classic}
        color={"#000"}
      />
      <div className={styles.imageBlock}>
        <Image
          src={pizzaList[index].img}
          alt=""
          width="500"
          height="500"
          className={styles.image}
          onClick={() => changeIndex(index + 1)}
        />
        <div className={styles.text}>
          <span>{pizzaList[index].title}</span>
          <Link
            href={`/products/${pizzaList[index]._id}`}
            passHref
            className={styles.link}
          >
            <button className={styles.btn}>
              <p>Переглянути</p>
              <svg
                strokeWidth="4"
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Features;
