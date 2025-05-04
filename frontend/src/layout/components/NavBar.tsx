import { NavLink, useNavigate } from "react-router-dom";
import versei_logo from "../../assets/versie_logo.svg";
import Button from "../../components/button/Button";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Marketplace", path: "/marketplace" },
  { name: "Governance", path: "/governance" },
];

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-pharo-white h-[120px] w-full px-[150px] border-b border-[#1B255E33] sticky top-0 z-10">
      <div className="h-full flex items-center justify-between">
        <div onClick={() => navigate("/dashboard/dashboard")} className="cursor-pointer">
          <img src={versei_logo} alt="VERSEI LOGO" />
        </div>

        <div>
          <ul className="flex gap-[24px]">
            {navItems.map(({ name, path }) => (
              <li key={name}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `font-bold text-[14px] ${
                      isActive ? "text-[#7B8CE5]" : "text-black"
                    } hover:text-[#7B8CE5]`
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <Button variant="solid">LAUNCH APP</Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
