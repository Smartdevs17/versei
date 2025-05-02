import React from "react";
import Button from "../button/Button";
import overlay from "../../assets/overlay.svg";

interface AssetCardProps {
  image: string;
  verified?: boolean;
  tags: string[];
  title: string;
  price: string;
  onBuyClick: () => void;
  onDetailsClick: () => void;
}

const AssetCard: React.FC<AssetCardProps> = ({
  image,
  verified = false,
  tags,
  title,
  price,
  onBuyClick,
  onDetailsClick,
}) => {
  return (
    <div className="bg-white rounded-xl border border-[#E0E5EB] w-full shadow-sm">
      <div className="relative" style={{ backgroundImage: `url(${overlay})` }}>
        <img
          src={image}
          alt={title}
          className="rounded-md w-full h-36 object-cover"
        />
        {verified && (
          <span className="absolute top-2 left-2 bg-[#3D7A81] text-[#FFFFFF] text-xs font-semibold px-2 py-0.5 rounded-[4px]">
            Verified
          </span>
        )}
      </div>
      <div className="p-3">
        <div className="mt-3 flex flex-wrap gap-2 text-[#333D4C]">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-[#EEF1F6] font-semibold text-[9px] px-2 py-0.5 rounded-[4px]"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="mt-2 font-medium text-sm text-[#626262]">{title}</h3>
        <p className="text-[12px] text-[#4E5562]">{price}</p>
        <div className="mt-3 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onBuyClick}
            className="text-sm font-bold px-3"
            borderColor="#0000FF"
            textColor="#0000FF"
            height="26px"
          >
            BUY
          </Button>
          <button
            onClick={onDetailsClick}
            className="text-[12px] text-[#4E5562] hover:underline cursor-pointer"
          >
            SEE DETAILS
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
