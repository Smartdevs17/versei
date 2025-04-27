import AssetsCard from "../Cards/AssetsCard";
import assetsHome from "../../assets/home/assetHome.svg";
import assetsAgriculture from "../../assets/home/assetAgriculture.svg";
import assetsComodity from "../../assets/home/assetsComodity.svg";
import assetsArt from "../../assets/home/assetsArt.svg";
import DescriptionSection from "./DescriptionSection";

const items = [
  {
    title: "Real Estate",
    description: "Tokenize condos or invest in rentals for steady yields",
    icon: assetsHome,
  },
  {
    title: "Agriculture",
    description: "Grow wealth with vineyards or own a share of harvests",
    icon: assetsAgriculture,
  },
  {
    title: "Commodities",
    description: "Fund metals or trade tokens of tangible resources",
    icon: assetsComodity,
  },
  {
    title: "Collectibles",
    description: "List art or buy fractions of rare treasures",
    icon: assetsArt,
  },
];

const DiscoverAssets = () => {
  return (
    <div className="px-[150px] flex flex-col items-center justify-center mt-10">
      <p className="font-bold text-[15px] ">Discover Your Asset</p>
      <p className="font-bold text-[48px]">Categories</p>

      <div className="flex mt-[59px]">
        <AssetsCard data={items} />
      </div>
      <div className="mt-[100px]">
        <DescriptionSection />
      </div>
    </div>
  );
};

export default DiscoverAssets;
