import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import React from "react";
import Footer from "./components/Footer";

const LandingPageLayout = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Outlet />
      <Footer />
    </React.Fragment>
  );
};

export default LandingPageLayout;
