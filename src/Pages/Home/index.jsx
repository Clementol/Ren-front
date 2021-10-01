import React from "react";
import { Link } from "react-router-dom";

import { BsArrowRight } from "react-icons/bs";
import Footer from "../../container/Footer";
import logo from "../../static/images/logo.jpg";
import "./style.css";

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
            An Online Platform that Help Members Of Cooperative Societies To
            Have A Saving Culture.
          </p>
          <div className="getStartedButton">
            <Link to="/all-staffs">
              <span>
                Get Started &nbsp;&nbsp;
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
                <img src="/contrib.svg" alt="img" />
              </div>
              <div className="cardText">
                <p>Make Contributions Easier at Specified Time</p>
              </div>
            </div>
            <div className="card">
              <div className="cardImage">
                <img src="/give.svg" alt="img" />
              </div>
              <div className="cardText">
                <p>Make Access to Loan Easier</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
