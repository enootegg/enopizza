import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles/PizzaCard.module.scss";
import { Cart } from "../Icons";
import { Pizza } from "@/interfaces";
import { useDispatch } from "react-redux";
import { addProduct } from "redux/cartSlice";

const PizzaCard: FC<{ pizza: Pizza }> = ({ pizza }) => {
  const [price, setPrice] = useState(pizza.prices[1]);
  const [size, setSize] = useState(1);

  const dispatch = useDispatch();

  const changePrice = (number: number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex: number) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleClick = () => {
    dispatch(addProduct({ ...pizza, extras: null, price, quantity: 1 }));
  };

  return (
    <div className={styles.container}>
      <Link href={`/products/${pizza._id}`} passHref>
        <Image
          src={pizza.img}
          alt=""
          width="300"
          height="300"
          className={styles.image}
        />
      </Link>
      <div className={styles.content}>
        <div className={styles.title}>
          <h1>{pizza.title}</h1>
          <span>{pizza.weight[size]}г</span>
        </div>
        <p>{pizza.desc}</p>
        <div className={styles.sizeAndPrice}>
          <div className={styles.size}>
            Розмір -{" "}
            <span
              onClick={() => handleSize(0)}
              className={size === 0 ? styles.active : ""}
            >
              20
            </span>
            /
            <span
              onClick={() => handleSize(1)}
              className={size === 1 ? styles.active : ""}
            >
              30
            </span>
            /
            <span
              onClick={() => handleSize(2)}
              className={size === 2 ? styles.active : ""}
            >
              40
            </span>{" "}
            см
          </div>
          <span className={styles.price}>{price} грн</span>
        </div>
        <div className={styles.buttons}>
          <Link
            href={`/products/${pizza._id}`}
            passHref
            className={styles.look}
          >
            <button className={styles.look}>Переглянути</button>
          </Link>
          <button className={styles.cart} onClick={handleClick}>
            <Cart
              width={29}
              height={28}
              color="#fff"
              className={styles.cartIcon}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaCard;
