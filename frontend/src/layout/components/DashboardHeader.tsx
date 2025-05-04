import versei_logo from "../../assets/versie_logo.svg";
import Button from "../../components/button/Button";
import NavBarSearchInput from "./NavBarSearchInput";
import icon_notification from "../../assets/nav/Icon_notification.svg";
import profile_prefill from "../../assets/nav/Bg.svg";
import chevron_down from "../../assets/nav/chevron_down.svg";
import { useNavigate } from "react-router-dom";

// const navItems = [
//   { name: "Home", path: "/" },
//   { name: "Marketplace", path: "/marketplace" },
//   { name: "Governance", path: "/governance" },
// ];

const DashboardHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-pharo-white h-[120px] w-full px-[150px] border-b border-[#1B255E33] sticky top-0 z-10">
      <div className="h-full flex items-center justify-between">
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <img src={versei_logo} alt="VERSEI LOGO" />
        </div>

        <div className="flex items-center gap-[50px]">
          <NavBarSearchInput />

          <div className="flex items-center gap-[36px]">
            <img src={icon_notification} alt="" className="cursor-pointer" />

            <div className="flex items-center gap-[10px] cursor-pointer">
              <img src={profile_prefill} alt="" />
              <p className="font-semibold text-[14px] text-[#3F4765] flex items-center gap-[5px]">
                0xBEff...efgeke
                <img src={chevron_down} alt="" />
              </p>
            </div>
          </div>
        </div>

        <div>
          <Button className="h-[24px]" variant="solid">
            LOG OUT
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
