import Button from "../../components/button/Button";
import AssetCard from "../../components/dashboard/AssetCard";
import DashboardTitle from "../../components/dashboard/DashboardTitle";
import properties_image from "../../assets/properties_image.svg";

const MarketPlaceDashboard = () => {
  const wishlistData = [
    {
      image: properties_image,
      verified: true,
      tags: ["Agriculture", "5% P/A", "200/500 left"],
      title: "Sunny Hills Vineyard",
      price: "1.50 USDT",
    },
    {
      image: properties_image,
      verified: true,
      tags: ["Agriculture", "5% P/A", "200/500 left"],
      title: "Sunny Hills Vineyard",
      price: "1.50 USDT",
    },
    {
      image: properties_image,
      verified: true,
      tags: ["Agriculture", "5% P/A", "200/500 left"],
      title: "Sunny Hills Vineyard",
      price: "1.50 USDT",
    },
    {
      image: properties_image,
      verified: true,
      tags: ["Agriculture", "5% P/A", "200/500 left"],
      title: "Sunny Hills Vineyard",
      price: "1.50 USDT",
    },
    {
      image: properties_image,
      verified: true,
      tags: ["Agriculture", "5% P/A", "200/500 left"],
      title: "Sunny Hills Vineyard",
      price: "1.50 USDT",
    },
    {
      image: properties_image,
      verified: true,
      tags: ["Agriculture", "5% P/A", "200/500 left"],
      title: "Sunny Hills Vineyard",
      price: "1.50 USDT",
    },
    {
      image: properties_image,
      verified: true,
      tags: ["Agriculture", "5% P/A", "200/500 left"],
      title: "Sunny Hills Vineyard",
      price: "1.50 USDT",
    },
    {
      image: properties_image,
      verified: true,
      tags: ["Agriculture", "5% P/A", "200/500 left"],
      title: "Sunny Hills Vineyard",
      price: "1.50 USDT",
    },
  ];
  return (
    <>
      <DashboardTitle
        title="Marketplace"
        subtitle="Trade tokenized assets"
        buttonText="ADD TO WISHLIST"
        onClick={() => console.log("Add to wishlist clicked")}
      />

      <div className="mt-4 flex gap-4">
        <Button borderColor="#111827" variant="outline">
          All
        </Button>
        <Button borderColor="#E0E5EB" variant="outline">
          Agriculture
        </Button>
        <Button borderColor="#E0E5EB" variant="outline">
          Commodities
        </Button>
        <Button borderColor="#E0E5EB" variant="outline">
          Real Estate
        </Button>
      </div>

      <div className="w-full grid grid-cols-4 mt-5 mb-10 gap-4">
        {wishlistData.map((item, idx) => (
          <AssetCard
            key={idx}
            image={item.image}
            verified={item.verified}
            tags={item.tags}
            title={item.title}
            price={item.price}
            onBuyClick={() => console.log(`Buy ${item.title}`)}
            onDetailsClick={() => console.log(`Details of ${item.title}`)}
          />
        ))}
      </div>
    </>
  );
};

export default MarketPlaceDashboard;
