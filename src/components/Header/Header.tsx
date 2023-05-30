import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import styles from "./styles/Header.module.scss";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

const Header: FC = () => {
  const quantity = useSelector((state: any) => state.cart.quantity);
  return (
    <header className={styles.header}>
      <div className={styles.burger}>
        <BurgerMenu />
      </div>
      <nav className={styles.left}>
        <ul>
          <li>
            <Link href="/" className={styles.link}>
              Головна
            </Link>
          </li>
          <li>Піца</li>
          {/* <li>Контакти</li> */}
        </ul>
      </nav>
      <Link href="/" className={styles.logoLink}>
        <Image
          src="/img/logo.svg"
          height={55}
          width={270}
          alt="logo"
          className={styles.img}
        />
      </Link>
      <nav className={styles.right}>
        <ul>
          {/* <li>Акції</li>
          <li>Про нас</li> */}
          <li>Контакти</li>
          <Link href="/cart">
            <li className={styles.cart}>
              <Image
                src="/img/cart.svg"
                height={26}
                width={25}
                alt="cart icon"
              />
              {quantity > 0 && (
                <span className={styles.quantity}>{quantity}</span>
              )}
            </li>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
