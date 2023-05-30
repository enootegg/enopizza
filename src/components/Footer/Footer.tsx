import { FC } from "react";
import styles from "./styles/Footer.module.scss";
import Image from "next/image";
import Link from "next/link";
import {
  Telegram,
  Instagram,
  Github,
  TikTok,
  YouTube,
  Call,
  Mail,
} from "@/components/Icons";
import { domain } from "utils/config";

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <Image
          src="/img/logo.svg"
          height={69}
          width={337}
          alt="logo"
          className={styles.img}
        />
        <span>Смакуйте задоволення!</span>
        <ul className={styles.socials}>
          <li>
            <Link href="https://t.me/enootegg" className={styles.link}>
              <Telegram
                height={34}
                width={34}
                color="#fff"
                className={`${styles.icon} ${styles.telegram}`}
              />
            </Link>
          </li>
          <li>
            <Link
              href="https://www.instagram.com/enootegg/"
              className={styles.link}
            >
              <Instagram
                height={34}
                width={34}
                color="#fff"
                className={styles.icon}
              />
            </Link>
          </li>
          <li>
            <Link href="https://github.com/enootegg" className={styles.link}>
              <Github
                height={34}
                width={34}
                color="#fff"
                className={styles.icon}
              />
            </Link>
          </li>
          <li>
            <Link href="https://www.tiktok.com/" className={styles.link}>
              <TikTok
                height={34}
                width={34}
                color="#fff"
                className={styles.icon}
              />
            </Link>
          </li>
          <li>
            <Link href="https://www.youtube.com/" className={styles.link}>
              <YouTube
                height={34}
                width={34}
                color="#fff"
                className={styles.icon}
              />
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.right}>
        <div className={styles.info}>
          <h3 className={styles.location}>
            Івано-Франківськ
            <br />
            вул. Тролейбусна 24
          </h3>
          <h4>Час роботи:</h4>
          <span>
            пн-пт: з <b>10:00</b> до <b>23:00</b>
            <br />
            сб-нд: з <b>12:00</b> до <b>23:00</b>
          </span>
          <h4>Приймаємо замовлення:</h4>
          <span>
            до <b>22:00</b>
          </span>
          <div className={styles.lang}>
            <span>UA</span>/
            <span>
              {/* <Link href="http://localhost:3000/img/mda.jpg">RU</Link> */}
              <Link href={`${domain}img/mda.jpg`}>RU</Link>
            </span>
          </div>
        </div>
        <div className={styles.contacts}>
          <h3>
            <Link href="tel:+380689364508" className={styles.link}>
              <Call
                height={22}
                width={22}
                color="#000"
                className={styles.icon}
              />
              +380689364508
            </Link>
          </h3>
          <h4>Написати нам:</h4>
          <span>
            <Link
              href="mailto:vitaliybodnarchuk2002@gmail.com"
              className={styles.link}
            >
              <Mail
                height={24}
                width={24}
                color="#000"
                className={styles.icon}
              />
              vitaliybodnarchuk2002@gmail.com
            </Link>
          </span>
          <h5>
            made with ❤ by
            <Link href="https://github.com/enootegg" className={styles.link}>
              enootegg
            </Link>
          </h5>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
