import Button from "../../components/button/Button";
import AssetCard from "../../components/dashboard/AssetCard";
import DashboardTitle from "../../components/dashboard/DashboardTitle";
import properties_image from "../../assets/properties_image.svg";
import BuySellCard from "../../components/assetDetails/BuySellCard";
import { useState } from "react";

const MarketPlaceDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
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
            onBuyClick={() => setIsModalOpen(true)}
            onDetailsClick={() => console.log(`Details of ${item.title}`)}
          />
        ))}
      </div>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={handleCloseModal}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "24px",
              maxWidth: "400px",
              width: "90%",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                background: "none",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
                color: "#4b5563",
              }}
            >
              ✕
            </button>
            <BuySellCard initialTab="Buy" onBuyAssetClick={handleCloseModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default MarketPlaceDashboard;
