import React from 'react';

interface MarketSectionProps {
    interestRate: string;
}

const MarketSection: React.FC<MarketSectionProps> = ({ interestRate }) => {
    return (
        <div className="w-[800px] bg-white text-black rounded-lg p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">MARKET</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                    <p className="text-sm text-gray-500">Market Cap</p>
                    <p className="font-semibold">$120.00M</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Volume (24H)</p>
                    <p className="font-semibold">$120.00M</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Circulating Supply</p>
                    <p className="font-semibold">$120.00M</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Holders</p>
                    <p className="font-semibold">200,000</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Yield Per Annum</p>
                    <p className="font-semibold">{interestRate}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Lock Period</p>
                    <p className="font-semibold">100 days</p>
                </div>
            </div>
        </div>
    );
};

export default MarketSection;