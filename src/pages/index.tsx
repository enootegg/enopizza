import Head from "next/head";
import { Inter } from "next/font/google";
import { Featured, PizzaList, Add, AddButton, Features } from "@/components";
import axios from "axios";
import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { getCookie } from "cookies-next";
import { Pizza } from "@/interfaces";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  pizzaList: [Pizza];
  token: string;
}

export default function Home({ pizzaList, token }: Props) {
  const [close, setClose] = useState(true);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (getCookie("token") === token) {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [token]);

  return (
    <>
      <Head>
        <title>EnoPizza</title>
        <meta
          name="description"
          content="EnoPizza - це справжній шедевр серед піцерій! Ми використовуємо тільки найсвіжіші інгредієнти, щоб забезпечити максимальний смак і задоволення для наших клієнтів. Наші кулінарні майстри готують кожну піцу з великою увагою до деталей, щоб кожен укус був справжнім блаженством. Відвідайте нашу піцерію і насолоджуйтеся ідеальною комбінацією тонкої скоринки, соковитої начинки та незабутнього смаку."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Features pizzaList={pizzaList} />
      {admin && <AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <Add setClose={setClose} />}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get<[Pizza]>("http://localhost:3000/api/products");
  return {
    props: {
      pizzaList: res.data,
      token: process.env.TOKEN,
    },
  };
};

// export const getServerSideProps = async (ctx: any) => {
//   const myCookie = ctx.req?.cookies || "";
//   let admin = false;

//   if (myCookie.token === process.env.TOKEN) {
//     admin = true;
//   }

//   const res = await axios.get("http://localhost:3000/api/products");
//   return {
//     props: {
//       pizzaList: res.data,
//       admin,
//     },
//   };
// };
