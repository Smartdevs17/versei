import React, { useState, useEffect } from 'react';

interface MarketplaceAsset {
    image: string;
    category: string;
    interestRate: string;
    availability: string;
    title: string;
    price: string;
}

export interface BuySellCardProps {
    initialTab?: 'Buy' | 'Sell';
    asset?: MarketplaceAsset;
    onClose?: () => void;
}

const BuySellCard: React.FC<BuySellCardProps> = ({ initialTab = 'Buy', asset }) => {
    const [activeTab, setActiveTab] = useState<'Buy' | 'Sell'>(initialTab);
    const [quantity, setQuantity] = useState<number>(10);

    useEffect(() => {
        setActiveTab(initialTab);
    }, [initialTab]);

    const pricePerUnit = asset ? parseFloat(asset.price.replace(' USDT', '')) : 200;
    const totalCost = (pricePerUnit * quantity).toFixed(2);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value) || 0;
        setQuantity(newQuantity);
    };

    return (
        <div className="bg-white text-black rounded-lg p-6">
            <div className="flex space-x-2 mb-4">
                <button
                    className={`px-4 py-2 rounded ${activeTab === 'Buy' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                    onClick={() => setActiveTab('Buy')}
                >
                    Buy
                </button>
                <button
                    className={`px-4 py-2 rounded ${activeTab === 'Sell' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                        }`}
                    onClick={() => setActiveTab('Sell')}
                >
                    Sell
                </button>
            </div>
            {activeTab === 'Buy' && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">{asset?.title || 'Asset'}</h3>
                    <div>
                        <label className="block text-sm font-medium">Price</label>
                        <p className="w-full p-2 rounded bg-gray-100">{asset ? `${pricePerUnit} USDT` : '$200'}
                        </p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Quantity</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Total Cost</label>
                        <p className="w-full p-2 rounded bg-gray-100">{`$${totalCost}`}</p>
                    </div>
                    <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Buy Asset
                    </button>
                </div>
            )}
            {activeTab === 'Sell' && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">{asset?.title || 'Asset'}</h3>
                    <div>
                        <label className="block text-sm font-medium">Price</label>
                        <p className="w-full p-2 rounded bg-gray-100">{asset ? `${pricePerUnit} USDT` : '$200'}
                        </p>
                        
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Quantity</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={handleQuantityChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Total Cost</label>
                        <p className="w-full p-2 rounded bg-gray-100">{`$${totalCost}`}</p>
                          
                    </div>
                    <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Sell Asset
                    </button>
                </div>
            )}
        </div>
    );
};

export default BuySellCard;