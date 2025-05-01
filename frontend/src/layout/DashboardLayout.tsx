import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import DashboardHeader from "./components/DashboardHeader";
import DashboardSIdebar from "./components/DashboardSIdebar";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-[#FBFBFB] overflow-y-auto">
      <DashboardHeader />
      <div className="flex pt-[24px] flex-1">
        <div className="w-[346px] flex justify-end">
          <DashboardSIdebar />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
