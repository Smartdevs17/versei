import React from "react";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";

const DashboardLayout = () => {
  return (
    <div>
      <React.Fragment>
        <NavBar />
        <Outlet />
        <Footer />
      </React.Fragment>
    </div>
  );
};

export default DashboardLayout;
