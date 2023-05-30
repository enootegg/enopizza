import { NextPage } from "next";
import styles from "./styles/Cart.module.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "redux/cartSlice";
import { OrderDetails } from "@/components";

const Cart: NextPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);

  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  // This values are the props in the UI
  const amount = cart.total;
  const currency = "USD";
  const style = { layout: "vertical" as "vertical" };

  const router = useRouter();

  const createOrder = async (data: any) => {
    try {
      const res = await axios.post("http://localhost:3000/api/orders", data);
      res.status === 201 && router.push("/orders/" + res.data._id);
      dispatch(reset());
    } catch (error) {
      console.log(error);
    }
  };

  // Custom component to wrap the PayPalButtons and handle currency changes
  const ButtonWrapper = ({ currency, showSpinner }: any) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId;
              });
          }}
          onApprove={function (data, actions: any) {
            return actions.order.capture().then(function (details: any) {
              const shipping = details.purchase_units[0].shipping;
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              });
            });
          }}
        />
      </>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Піца</th>
              <th>Назва</th>
              <th>Додатки</th>
              <th>Ціна</th>
              <th>Кількість</th>
              <th>Разом</th>
            </tr>
            {cart.products.map((product: any) => (
              <tr className={styles.tr} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image src={product.img} alt="" width={100} height={100} />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extras?.map((extra: any) => (
                      <span key={extra._id}>{extra.text} </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>{product.price} грн</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    {product.price * product.quantity} грн
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Загальна сума</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Разом:</b>
            {cart.total} грн
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Знижка:</b>0.00 грн
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>До сплати:</b>
            {cart.total} грн
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button
                className={styles.payButton}
                onClick={() => setCash(true)}
              >
                Оплата при отриманні
              </button>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "AYNQUdxinl7eYup6-KCiXy5dSNr35hhkH4QTOwnfiL6_Tm-6hYMG5_s6za-09CbZRi-OyqTip2-_jcdq",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "card,credit,p24",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button className={styles.button} onClick={() => setOpen(true)}>
              Перейти до оплати
            </button>
          )}
        </div>
      </div>
      {cash && <OrderDetails total={cart.total} createOrder={createOrder} />}
    </div>
  );
};

export default Cart;
