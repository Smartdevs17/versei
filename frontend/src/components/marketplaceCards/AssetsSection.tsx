import React, { useState } from 'react';
import MarketplaceAssetCard from './MarketplaceAssetCard';

// Define the interface for the vineyard data
interface MarketplaceAsset {
    image: string;
    category: string;
    interestRate: string;
    availability: string;
    title: string;
    price: string;
}

const AssetsSection: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<string>('ALL');

    const marketplaceAssetData: MarketplaceAsset[] = [
        {
            image: "ipfs://QmP5v7g3Z2k4x6z8f8e5f8e5f8e5f8e5f8e5f8e5f8e5f8/asset1.jpg",
            category: "Agriculture",
            interestRate: "5% P/A",
            availability: "200/500 left",
            title: "Sunny Hills Vineyard",
            price: "150.50 USDT",
        },
        {
            image: "ipfs://QmP5v7g3Z2k4x6z8f8e5f8e5f8e5f8e5f8e5f8e5f8e5f8/asset2.jpg",
            category: "Commodities",
            interestRate: "3% P/A",
            availability: "50/200 left",
            title: "Coastal Sculpture Collection",
            price: "200.00 USDT",
        },
        ...Array(10).fill({
            image: "https://via.placeholder.com/400x300",
            category: "Agriculture",
            interestRate: "5% P/A",
            availability: "200/500 left",
            title: "Sunny Hills Vineyard",
            price: "150.50 USDT",
        }),
    ];

    // Filter data based on active filter
    const filteredData: MarketplaceAsset[] = activeFilter === 'ALL'
        ? marketplaceAssetData
        : marketplaceAssetData.filter((item: MarketplaceAsset) => item.category.toLowerCase() === activeFilter.toLowerCase());

    return (
        <div style={{ padding: "20px", maxWidth: "", margin: "", backgroundColor: "#FAFEFE" }}>

            {/* Filter Bar */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
                {['ALL', 'Agriculture', 'Commodities', 'Real Estate'].map((filter) => (
                    <button
                        key={filter}
                        style={{
                            padding: "8px 16px",
                            border: "none",
                            borderRadius: "9999px",
                            backgroundColor: activeFilter === filter ? "#2563eb" : "#e5e7eb",
                            color: activeFilter === filter ? "white" : "#4b5563",
                            fontWeight: "bold",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease",
                        }}
                        onClick={() => setActiveFilter(filter)}
                        onMouseEnter={(e) => {
                            if (activeFilter !== filter) {
                                e.currentTarget.style.backgroundColor = "#d1d5db";
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (activeFilter !== filter) {
                                e.currentTarget.style.backgroundColor = "#e5e7eb";
                            }
                        }}
                    >
                        {filter}
                    </button>
                ))}
            </div>

            {/* Assets Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "20px",
                }}
            >
                {filteredData.map((asset, index) => (
                    <MarketplaceAssetCard key={index} data={asset} />
                ))}
            </div>
        </div>
    );
};

export default AssetsSection;
