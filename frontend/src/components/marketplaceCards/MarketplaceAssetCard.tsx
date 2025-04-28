import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BuySellCard from '../assetDetails/BuySellCard';
import { useWishlist } from '../../context/WishlistContext';

interface MarketplaceAsset {
  image: string;
  category: string;
  interestRate: string;
  availability: string;
  title: string;
  price: string;
  createdAt: string;
}

interface MarketplaceAssetCardProps {
  data: MarketplaceAsset;
}

const MarketplaceAssetCard: React.FC<MarketplaceAssetCardProps> = ({ data }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isWishlisted, addToWishlist, removeFromWishlist } = useWishlist();

  const imageHeight = "150px";
  const titleFontSize = "16px";
  const bodyFontSize = "14px";

  const isNewAsset = () => {
    const createdAtDate = new Date(data.createdAt);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - createdAtDate.getTime();
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    return hoursDifference < 24;
  };

  const handleSeeDetails = () => {
    const encodedTitle = encodeURIComponent(data.title.replace(/\s+/g, '-'));
    console.log('Navigating with data:', data);
    navigate(`/asset/${encodedTitle}`, { state: { asset: data } });
  };

  const handleBuy = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddToWishlist = () => {
    if (isWishlisted(data.title)) {
      removeFromWishlist(data.title);
      console.log(`Removed ${data.title} from wishlist`);
    } else {
      addToWishlist(data.title);
      console.log(`Added ${data.title} to wishlist`);
    }
  };

  return (
    <>
      <div
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="relative">
          <img
            src={data.image}
            alt={data.title}
            style={{
              width: "100%",
              height: imageHeight,
              objectFit: "cover",
              borderRadius: "8px 8px 0 0",
            }}
          />
          {isNewAsset() && (
            <span
              style={{
                position: "absolute",
                top: "8px",
                left: "8px",
                backgroundColor: "#ff0000",
                color: "white",
                fontSize: "12px",
                fontWeight: "bold",
                padding: "2px 8px",
                borderRadius: "4px",
              }}
            >
              NEW
            </span>
          )}
          <button
            onClick={handleAddToWishlist}
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <svg
              className={`w-6 h-6 ${isWishlisted(data.title) ? 'text-red-500' : 'text-gray-500'} group-hover:text-white`}
              fill={isWishlisted(data.title) ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </div>
        <div style={{ padding: "8px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: bodyFontSize,
              color: "#6b7280",
              marginBottom: "8px",
            }}
          >
            <span>{data.category}</span>
            <span>{data.interestRate}</span>
            <span>{data.availability}</span>
          </div>
          <h2
            className="font-bold"
            style={{ fontSize: titleFontSize, margin: 0 }}
          >
            {data.title}
          </h2>
          <p
            style={{
              fontSize: bodyFontSize,
              fontWeight: "bold",
              color: "#111827",
              marginTop: "4px",
            }}
          >
            {data.price}
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            <button
              style={{
                backgroundColor: "#2563eb",
                color: "white",
                fontWeight: "bold",
                padding: "8px 24px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#1d4ed8";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#2563eb";
              }}
              onClick={handleBuy}
            >
              BUY
            </button>
            <button
              style={{
                background: "none",
                border: "none",
                color: "#4b5563",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#111827";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#4b5563";
              }}
              onClick={handleSeeDetails}
            >
              SEE DETAILS
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={handleCloseModal}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '24px',
              maxWidth: '400px',
              width: '90%',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                color: '#4b5563',
              }}
            >
              ✕
            </button>
            <BuySellCard initialTab="Buy" asset={data} />
          </div>
        </div>
      )}
    </>
  );
};

export default MarketplaceAssetCard;