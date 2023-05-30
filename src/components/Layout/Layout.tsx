import { FC, PropsWithChildren } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <>
      {/* <Navbar /> */}
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
