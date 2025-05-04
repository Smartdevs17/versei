import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import DashboardHeader from "./components/DashboardHeader";
import DashboardSIdebar from "./components/DashboardSIdebar";

const DashboardLayout = () => {
  return (
    <>
      <DashboardHeader />
      <div className="flex pt-[24px] flex-1 px-[150px] gap-5">
        <div className="w-[346px] flex">
          <DashboardSIdebar />
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashboardLayout;
