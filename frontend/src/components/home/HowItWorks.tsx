import AssetsCard from "../Cards/AssetsCard";

const HowItWorks = () => {
  const items = [
    {
      title: "Verify",
      description:
        "Managers submit KYC via Sumsub and earn community approval on Pharos",
      number: "1",
    },
    {
      title: "Tokenize",
      description: "List your asset, set token prices, and go live",
      number: "2",
    },
    {
      title: "Trade",
      description: "Investors buy tokens from managers and share profits",
      number: "3",
    },
  ];
  return (
    <div className="px-[150px] flex flex-col items-center justify-center mt-10">
      <p className="font-bold text-[15px] text-center">How it works</p>
      <p className="font-bold text-[48px] text-center">
        From Asset to Wealth in <br /> Three Steps
      </p>

      <div className="flex mt-[59px]">
        <AssetsCard data={items} cardWidth="385px" cardHeight="385px" cardPadding="46px"/>
      </div>
    </div>
  );
};

export default HowItWorks;
