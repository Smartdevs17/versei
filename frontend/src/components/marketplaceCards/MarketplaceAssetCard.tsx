import React from 'react';

// Define the interface for the MarketplaceAsset data
interface MarketplaceAsset {
  image: string;
  category: string;
  interestRate: string;
  availability: string;
  title: string;
  price: string;
}

// Define the props interface for the MarketplaceAsset Card component
interface MarketplaceAssetCardProps {
  cardWidth?: string;
  cardHeight?: string;
  titleFontSize?: string;
  bodyFontSize?: string;
  imageHeight?: string;
  cardPadding?: string;
  data: MarketplaceAsset;
}

const MarketplaceAssetCard: React.FC<MarketplaceAssetCardProps> = ({
  cardWidth = "276px",
  cardHeight = "400px",
  titleFontSize = "16px",
  bodyFontSize = "14px",
  imageHeight = "200px",
  cardPadding = "16px",
  data,
}) => {
  return (
    <div
      style={{
        width: cardWidth,
        height: cardHeight,
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        padding: cardPadding,
        display: "flex",
        flexDirection: "column",
        transition: "background-color 0.3s ease",
        cursor: "pointer",
        color: "black",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#f0f0f0";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "#ffffff";
      }}
      className="group"
    >
      {/* Image Section */}
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
        <button
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
            className="w-6 h-6 text-gray-500 group-hover:text-white"
            fill="none"
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

      {/* Content Section */}
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
          >
            SEE DETAILS
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceAssetCard;