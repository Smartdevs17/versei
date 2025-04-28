import Button from "../button/Button";
import discover_bg from "../../assets/home/Replace_This.svg";

const DescriptionSection = () => {
  return (
    <>
      <div className="flex w-full items-center gap-10">
        <div className="flex-1 flex items-center justify-end">
          <div className="w-[444px]">
            <p className="font-bold text-[48px]">Asset Managers</p>

            <p className="font-medium text-[20px] mt-4">
              Turn your real estate, collectibles, or farm into tokens. Raise
              funds without loans, share profits globally, and stay in
              control—all secured on Pharos’ blockchain.
            </p>

            <div className="mt-10">
              <Button variant="outline" className="w-[200px] text-pharos-black">
                GET STARTED
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <img src={discover_bg} alt="" />
        </div>
      </div>

      <div className="flex w-full items-center gap-10 mt-32">
        <div className="flex-1 flex items-center justify-end">
          <div className="w-[444px]">
            <p className="font-bold text-[48px]">Asset Investors</p>

            <p className="font-medium text-[20px] mt-4">
              Own a fraction of properties, art, or agriculture. Earn yields,
              trade tokens, and trust the process with Pharos’ transparent,
              decentralized system
            </p>

            <div className="mt-10">
              <Button variant="outline" className="w-[200px] text-pharos-black">
                GET STARTED
              </Button>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <img src={discover_bg} alt="" />
        </div>
      </div>
    </>
  );
};

export default DescriptionSection;
