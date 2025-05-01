import icon_search from "../../assets/nav/icon_search.svg";
const NavBarSearchInput = () => {
  return (
    <div className="w-[444px] h-[48px] bg-[#F4F6F8] rounded-[8px] flex items-center px-[20px]">
      <input placeholder="Search..." className="w-full border-none outline-none"/>
      <img src={icon_search} alt="" />
    </div>
  );
};

export default NavBarSearchInput;
