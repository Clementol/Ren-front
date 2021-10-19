import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

function Layout(props) {
  return (
    <>
      <Navbar />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}

export default Layout;
