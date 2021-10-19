import React from "react";
import { Link } from "react-router-dom";

import { BsArrowRight } from "react-icons/bs";
import Footer from "../../Components/Footer";
import logo from "../../static/images/logo.jpg";
import finc from "../../static/images/finc.png";
import aud from "../../static/images/aud.png";

import "./Home.css";

export default function Home() {
  return (
    <>
      <header className="billboard">
        <div className="brand">
          <Link to="/">
            <img alt="logo" width="70px" height="70vh" src={logo} />
          </Link>
        </div>
        {/* <div className="container"> */}
        <div className="billboardTextBox">
          <h1 className="title">Save Your Future by Saving Today</h1>
          <p>
            We Help Organizations to Move there Businesses to an Online Platform
            to Achieve More.
          </p>
          <div className="getStartedButton">
            <Link to="/all-staffs">
              <span>
                Our Staffs &nbsp;&nbsp;
                <BsArrowRight />
              </span>
            </Link>
          </div>
        </div>
        {/* </div> */}
      </header>
      <main>
        <div className="main">
          <div className="cards">
            <div className="card">
              <div className="cardImage">
                <img src={finc} alt="img" />
              </div>
              <div className="cardText">
                <p>To Help Organizations to Achieve More Financially</p>
              </div>
            </div>
            <div className="card">
              <div className="cardImage">
                <img src={aud} alt="img" />
              </div>
              <div className="cardText">
                <p>To Help Organizations to Reach more Customers</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
