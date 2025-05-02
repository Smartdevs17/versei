import { NavLink } from "react-router-dom";
import dashboard_icon from "../../assets/sideBar/dashboard_icon.svg";
import dashboard_icon_active from "../../assets/sideBar/dashboard_active_icon.svg";
import portfolio_icon from "../../assets/sideBar/portfolio_icon.svg";
import portfolio_icon_active from "../../assets/sideBar/portfolio_active_icon.svg";
import market_place_icon from "../../assets/sideBar/market_place_icon.svg";
import market_place_icon_active from "../../assets/sideBar/market_place_active_icon.svg";

const menuItems = [
  {
    name: "Dashboard",
    path: "",
    icon: dashboard_icon,
    activeIcon: dashboard_icon_active,
  },
  {
    name: "Portfolio",
    path: "/portfolio",
    icon: portfolio_icon,
    activeIcon: portfolio_icon_active,
  },
  {
    name: "Marketplace",
    path: "/marketplace",
    icon: market_place_icon,
    activeIcon: market_place_icon_active,
  },
];

const DashboardSidebar = () => {
  return (
    <div className="w-full flex flex-col gap-1">
      {menuItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) =>
            `group h-[56px] w-full rounded-[8px] flex items-center gap-[12px] px-[16px] transition-colors duration-300 ${
              isActive ? "bg-[#0026FF]" : "hover:bg-[#0026FF]"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? item.activeIcon : item.icon}
                alt=""
                className="w-[32px] h-[32px]"
              />
              <p
                className={`font-semibold transition-colors duration-300 ${
                  isActive ? "text-white" : "text-[#3F4765] group-hover:text-white"
                }`}
              >
                {item.name}
              </p>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default DashboardSidebar;
