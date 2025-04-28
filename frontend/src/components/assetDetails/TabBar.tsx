import React from 'react';

interface TabBarProps {
    activeTab: 'Overview' | 'Transactions' | 'Holders';
    setActiveTab: (tab: 'Overview' | 'Transactions' | 'Holders') => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex space-x-4 mb-4">
            <button
                className={`px-4 py-2 rounded ${activeTab === 'Overview' ? 'bg-blue- DLC text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                onClick={() => setActiveTab('Overview')}
            >
                Overview
            </button>
            <button
                className={`px-4 py-2 rounded ${activeTab === 'Transactions' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                onClick={() => setActiveTab('Transactions')}
            >
                Transactions
            </button>
            <button
                className={`px-4 py-2 rounded ${activeTab === 'Holders' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                onClick={() => setActiveTab('Holders')}
            >
                Holders
            </button>
        </div>
    );
};

export default TabBar;