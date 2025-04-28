import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import NavBar from '../../layout/components/NavBar';
import Footer from '../../layout/components/Footer';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface MarketplaceAsset {
  image: string;
  category: string;
  interestRate: string;
  availability: string;
  title: string;
  price: string;
  createdAt: string; // Add createdAt to match MarketplaceAssetCard
}

interface Transaction {
  id: number;
  type: string;
  address: string;
  dateTime: string;
  value: string;
}

interface Holder {
  id: number;
  address: string;
  value: string;
}

interface PriceDataPoint {
  timestamp: string;
  price: number;
}

const AssetDetails: React.FC = () => {
  const location = useLocation();
  const { title } = useParams<{ title: string }>();
  console.log('URL Parameter - title:', title);
  console.log('Location state:', location.state);

  const [asset, setAsset] = useState<MarketplaceAsset | undefined>(location.state?.asset);
  const [assetLoading, setAssetLoading] = useState<boolean>(!location.state?.asset);
  const [assetError, setAssetError] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false); // State for wishlist status

  // Mock function to fetch asset data based on title
  const fetchAssetByTitle = async (assetTitle: string): Promise<MarketplaceAsset> => {
    const mockAssets: MarketplaceAsset[] = [
      {
        image: "ipfs://QmP5v7g3Z2k4x6z8f8e5f8e5f8e5f8e5f8e5f8e5f8e5f8/asset1.jpg",
        category: "Agriculture",
        interestRate: "5% P/A",
        availability: "200/500 left",
        title: "Sunny Hills Vineyard",
        price: "150.50 USDT",
        createdAt: "2025-04-28T10:00:00Z",
      },
      {
        image: "ipfs://QmP5v7g3Z2k4x6z8f8e5f8e5f8e5f8e5f8e5f8e5f8e5f8/asset2.jpg",
        category: "Commodities",
        interestRate: "3% P/A",
        availability: "50/200 left",
        title: "Coastal Sculpture Collection",
        price: "200.00 USDT",
        createdAt: "2025-04-28T10:00:00Z",
      },
    ];

    const foundAsset = mockAssets.find((a) => a.title === assetTitle);
    if (!foundAsset) {
      throw new Error('Asset not found');
    }
    return foundAsset;
  };

  useEffect(() => {
    if (!asset && title) {
      const decodedTitle = decodeURIComponent(title).replace(/-/g, ' ');
      setAssetLoading(true);
      fetchAssetByTitle(decodedTitle)
        .then((fetchedAsset) => {
          setAsset(fetchedAsset);
          setAssetError(null);
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((err) => {
          setAssetError('Failed to load asset data. Please try again later.');
        })
        .finally(() => {
          setAssetLoading(false);
        });
    }
  }, [asset, title]);

  const [activeTab, setActiveTab] = useState<'Overview' | 'Transactions' | 'Holders'>('Overview');
  const [buySellTab, setBuySellTab] = useState<'Buy' | 'Sell'>('Buy');
  const [quantity, setQuantity] = useState<number>(10);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [holders, setHolders] = useState<Holder[]>([]);
  const [priceDataPoints, setPriceDataPoints] = useState<PriceDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [transactionsResponse, holdersResponse, priceResponse] = await Promise.all([
          new Promise<Transaction[]>((resolve) =>
            setTimeout(() => {
              resolve([
                {
                  id: 1,
                  type: 'Sent',
                  address: '0xBEF45762783492820',
                  dateTime: '12.09.2019 - 12:53 PM',
                  value: '$34,295',
                },
                {
                  id: 2,
                  type: 'Received',
                  address: '0xBEF45762783492820',
                  dateTime: '12.09.2019 - 12:53 PM',
                  value: '$34,295',
                },
                {
                  id: 3,
                  type: 'Received',
                  address: '0xBEF45762783492820',
                  dateTime: '12.09.2019 - 12:53 PM',
                  value: '$34,295',
                },
              ]);
            }, 1000)
          ),
          new Promise<Holder[]>((resolve) =>
            setTimeout(() => {
              resolve([
                {
                  id: 1,
                  address: '0xBEF45762783492820',
                  value: '$34,295',
                },
                {
                  id: 2,
                  address: '0xBEF45762783492820',
                  value: '$34,295',
                },
                {
                  id: 3,
                  address: '0xBEF45762783492820',
                  value: '$34,295',
                },
              ]);
            }, 1000)
          ),
          new Promise<PriceDataPoint[]>((resolve) =>
            setTimeout(() => {
              resolve(
                Array.from({ length: 60 }, (_, i) => ({
                  timestamp: (i + 1).toString(),
                  price: Math.random() * 50 + 25,
                }))
              );
            }, 1000)
          ),
        ]);

        setTransactions(transactionsResponse);
        setHolders(holdersResponse);
        setPriceDataPoints(priceResponse);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (assetLoading) {
    return (
      <>
        <NavBar />
        <div className="px-[150px] min-h-screen bg-gray-50 text-[#202224] p-6">
          <div className="text-center py-4">
            <p>Loading asset data...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (assetError || !asset) {
    return (
      <>
        <NavBar />
        <div className="px-[150px] min-h-screen bg-gray-50 text-[#202224] p-6">
          <div className="text-center py-4 text-red-500">
            <p>{assetError || 'Error: No asset data available.'}</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const priceData = {
    labels: priceDataPoints.map((point) => point.timestamp),
    datasets: [
      {
        label: 'Price',
        data: priceDataPoints.map((point) => point.price),
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: false,
        },
      },
      y: {
        display: true,
        title: {
          display: false,
        },
        beginAtZero: false,
      },
    },
  };

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      console.log(`Added ${asset.title} to wishlist`);

    } else {
      console.log(`Removed ${asset.title} from wishlist`);

    }
  };

  const pricePerUnit = parseFloat(asset.price.replace(' USDT', '')) || 0;
  const totalCost = (pricePerUnit * quantity).toFixed(2);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value) || 0;
    setQuantity(newQuantity);
  };

  return (
    <>
      <NavBar />

      <div className="px-[150px] min-h-screen bg-gray-50 text-[#202224] p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <img
              src={asset.image}
              alt={asset.title}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h1 className="text-xl font-bold">{asset.title}</h1>
              <p className="text-sm text-gray-400">{asset.category.toUpperCase()}</p>
            </div>
          </div>
          <button
            onClick={handleAddToWishlist}
            className={`px-4 py-2 rounded-lg border transition ${
              isWishlisted
                ? 'bg-red-500 text-white border-red-500 hover:bg-red-600'
                : 'bg-transparent text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white'
            }`}
          >
            {isWishlisted ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST'}
          </button>
        </div>

        {/* Tabs and Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Tabs and Content */}
          <div className="lg:col-span-2 bg-white text-black rounded-lg p-6">
            <div className="flex space-x-4 mb-4">
              <button
                className={`px-4 py-2 rounded ${
                  activeTab === 'Overview'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setActiveTab('Overview')}
              >
                Overview
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  activeTab === 'Transactions'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setActiveTab('Transactions')}
              >
                Transactions
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  activeTab === 'Holders'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setActiveTab('Holders')}
              >
                Holders
              </button>
            </div>

            {/* Loading and Error States */}
            {loading && (
              <div className="text-center py-4">
                <p>Loading...</p>
              </div>
            )}
            {error && (
              <div className="text-center py-4 text-red-500">
                <p>{error}</p>
              </div>
            )}

            {/* Tab Content */}
            {!loading && !error && (
              <>
                {activeTab === 'Overview' && (
                  <>
                    <h2 className="text-lg font-semibold mb-4">PRICE</h2>
                    <div className="w-full h-64">
                      <Line data={priceData} options={chartOptions} />
                    </div>
                  </>
                )}

                {activeTab === 'Transactions' && (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">TRANSACTIONS</h2>
                      <select className="border rounded p-1 text-black">
                        <option>October</option>
                        <option>September</option>
                        <option>August</option>
                      </select>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-gray-500">
                            <th className="p-2">No</th>
                            <th className="p-2">Transaction</th>
                            <th className="p-2">To/From</th>
                            <th className="p-2">Date - Time</th>
                            <th className="p-2">Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.length > 0 ? (
                            transactions.map((txn) => (
                              <tr key={txn.id} className="border-t">
                                <td className="p-2">{txn.id}</td>
                                <td className="p-2">{txn.type}</td>
                                <td className="p-2">{txn.address}</td>
                                <td className="p-2">{txn.dateTime}</td>
                                <td className="p-2">{txn.value}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={5} className="p-2 text-center text-gray-500">
                                No transactions available.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    {/* Pagination */}
                    <div className="flex justify-center mt-4 space-x-2">
                      <button className="px-2 py-1 border rounded text-gray-500">&lt;</button>
                      <button className="px-2 py-1 border rounded bg-blue-500 text-white">1</button>
                      <button className="px-2 py-1 border rounded text-gray-500">2</button>
                      <button className="px-2 py-1 border rounded text-gray-500">3</button>
                      <button className="px-2 py-1 border rounded text-gray-500">4</button>
                      <button className="px-2 py-1 border rounded text-gray-500">&gt;</button>
                    </div>
                  </>
                )}

                {activeTab === 'Holders' && (
                  <>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold">HOLDERS INFORMATION</h2>
                      <select className="border rounded p-1 text-black">
                        <option>October</option>
                        <option>September</option>
                        <option>August</option>
                      </select>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="text-gray-500">
                            <th className="p-2">No</th>
                            <th className="p-2">Holder</th>
                            <th className="p-2">Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {holders.length > 0 ? (
                            holders.map((holder) => (
                              <tr key={holder.id} className="border-t">
                                <td className="p-2">{holder.id}</td>
                                <td className="p-2">{holder.address}</td>
                                <td className="p-2">{holder.value}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={3} className="p-2 text-center text-gray-500">
                                No holders available.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    {/* Pagination */}
                    <div className="flex justify-center mt-4 space-x-2">
                      <button className="px-2 py-1 border rounded text-gray-500">&lt;</button>
                      <button className="px-2 py-1 border rounded bg-blue-500 text-white">1</button>
                      <button className="px-2 py-1 border rounded text-gray-500">2</button>
                      <button className="px-2 py-1 border rounded text-gray-500">3</button>
                      <button className="px-2 py-1 border rounded text-gray-500">4</button>
                      <button className="px-2 py-1 border rounded text-gray-500">&gt;</button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Buy/Sell Card */}
          <div className="bg-white text-black rounded-lg p-6">
            <div className="flex space-x-2 mb-4">
              <button
                className={`px-4 py-2 rounded ${
                  buySellTab === 'Buy' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setBuySellTab('Buy')}
              >
                Buy
              </button>
              <button
                className={`px-4 py-2 rounded ${
                  buySellTab === 'Sell' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setBuySellTab('Sell')}
              >
                Sell
              </button>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{asset.title}</h3>
              <div>
                <label className="block text-sm font-medium">Price</label>
                <p className="w-full p-2 rounded bg-gray-100">{asset.price}</p>
              </div>
              <div>
                <label className="block text-sm font-medium">Quantity</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-full p-2 border rounded"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Total Cost</label>
                <p className="w-full p-2 rounded bg-gray-100">${totalCost}</p>
              </div>
              <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                {buySellTab === 'Buy' ? 'Buy Asset' : 'Sell Asset'}
              </button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="w-[700px] bg-white text-black rounded-lg p-6 mt-6">
          <h2 className="text-lg font-semibold mb-4">ABOUT</h2>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.
            Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
            consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
            In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede
            mollis pretium. Integer tincidunt.
          </p>
          <div className="flex space-x-4">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Website</button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Whitepaper</button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">{asset.category}</button>
          </div>
        </div>

        {/* Market Section */}
        <div className="w-[700px] bg-white text-black rounded-lg p-6 mt-6">
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
              <p className="font-semibold">{asset.interestRate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Lock Period</p>
              <p className="font-semibold">100 days</p>
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="w-[700px] bg-white text-black rounded-lg p-6 mt-6">
          <h2 className="text-lg font-semibold mb-4">DOCUMENTS</h2>
          <div className="flex space-x-4">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Year 1 PDF</button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Year 2 PDF</button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Year 3 PDF</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AssetDetails;