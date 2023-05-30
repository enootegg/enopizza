import { FC } from "react";
import Image from "next/image";
import { useState } from "react";
import styles from "./styles/Featured.module.scss";

const Featured: FC = () => {
  const [index, setIndex] = useState(0);
  const images = [
    "/images/featured.png",
    "/images/featured2.png",
    "/images/featured3.png",
  ];

  const handleArrow = (direction: "l" | "r") => {
    if (direction === "l") {
      setIndex(index !== 0 ? index - 1 : 2);
    }
    if (direction === "r") {
      setIndex(index !== 2 ? index + 1 : 0);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={styles.arrowContainer}
        style={{ left: 0 }}
        onClick={() => handleArrow("l")}
      >
        <Image src="/images/arrowl.png" alt="" fill />
      </div>
      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {images.map((img, i) => (
          <div className={styles.imgContainer} key={i}>
            <Image src={img} alt="" fill />
          </div>
        ))}
      </div>
      <div
        className={styles.arrowContainer}
        style={{ right: 0 }}
        onClick={() => handleArrow("r")}
      >
        <Image src="/images/arrowr.png" fill alt="" />
      </div>
    </div>
  );
};

export default Featured;
