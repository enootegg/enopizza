import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import axios from "axios";
import styles from "./styles/Products.module.scss";
import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "redux/cartSlice";
import { ParsedUrlQuery } from "querystring";

interface Params extends ParsedUrlQuery {
  id: string;
}

interface Props {
  pizza: any;
}

const Products: NextPage<Props> = ({ pizza }) => {
  const [price, setPrice] = useState(pizza.prices[1]);
  const [size, setSize] = useState(1);
  const [quantity, setQuantity] = useState<number | string>(1);
  const [extras, setExtras] = useState<any>([]);

  const dispatch = useDispatch();

  const changePrice = (number: number) => {
    setPrice(price + number);
  };

  const handleSize = (sizeIndex: number) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size];
    setSize(sizeIndex);
    changePrice(difference);
  };

  const handleChange = (e: any, option: any) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev: any) => [...prev, option]);
    } else {
      changePrice(-option.price);
      setExtras(extras.filter((extra: any) => extra._id !== option._id));
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...pizza, extras, price, quantity }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>{price} грн</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Виберіть розмір</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src="/images/size.png" layout="fill" alt="" />
            <span
              className={`${styles.number} ${size === 0 ? styles.active : ""}`}
            >
              20см
            </span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src="/images/size.png" layout="fill" alt="" />
            <span
              className={`${styles.number} ${size === 1 ? styles.active : ""}`}
            >
              30см
            </span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src="/images/size.png" layout="fill" alt="" />
            <span
              className={`${styles.number} ${size === 2 ? styles.active : ""}`}
            >
              40см
            </span>
          </div>
        </div>
        <h3 className={styles.choose}>Виберіть додатки</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option: any) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor={option.text}>{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            defaultValue={1}
            className={styles.quantity}
          />
          <button className={styles.button} onClick={handleClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const res = await axios.get("http://localhost:3000/api/products");

  return {
    paths: res.data.map((pizza: any) => ({
      params: {
        id: pizza._id,
      },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await axios.get(
    `http://localhost:3000/api/products/${params?.id}`
  );
  return {
    props: {
      pizza: res.data,
    },
  };
};

export default Products;
