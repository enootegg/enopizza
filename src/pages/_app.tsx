import Layout from "@/components/Layout/Layout";
import "../styles/global.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "redux/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
