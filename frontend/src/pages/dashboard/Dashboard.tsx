import StatCard from "../../components/Cards/StatCard";
import AssetCard from "../../components/dashboard/AssetCard";
import DashboardTitle from "../../components/dashboard/DashboardTitle";
import properties_image from "../../assets/properties_image.svg";
import { useState } from "react";
import BuySellCard from "../../components/assetDetails/BuySellCard";

const transactions = [
  {
    no: 1,
    asset: "Sunny Hills Vineyard",
    transaction: "Swap",
    date: "12.09.2019 – 12.53 PM",
    qty: 20,
    amount: "$34,295",
    status: "Completed",
  },
  {
    no: 2,
    asset: "Vintage Car",
    transaction: "Transfered",
    date: "12.09.2019 – 12.53 PM",
    qty: 50,
    amount: "$34,295",
    status: "Completed",
  },
  {
    no: 3,
    asset: "Downtown Condo",
    transaction: "Transfered",
    date: "12.09.2019 – 12.53 PM",
    qty: 48,
    amount: "$34,295",
    status: "Completed",
  },
];

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
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
  ];
  return (
    <>
      <DashboardTitle
        title="Dashboard"
        subtitle="View your assets all in one place"
        buttonText="BUY ASSET"
        onClick={() => console.log("Buy asset clicked")}
      />

      <div className="grid grid-cols-3 gap-[39px] mt-[31px]">
        <StatCard title="Versei TVL" value="$34,164,830.2" />
        <StatCard title="RWAs" value="5" />
        <StatCard title="Portfolio Balance" value="$40,689" />
      </div>

      <section
        className="p-8 bg-[#FFFFFF] rounded-xl mt-8"
        style={{
          boxShadow: "4.82px 4.82px 43.42px 0px #0000000D",
        }}
      >
        <h2 className="text-lg font-semibold mb-4">WISHLIST</h2>
        <div className="grid grid-cols-4 gap-4">
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
      </section>

      <div
        className="bg-white p-8 rounded-xl w-full mt-8 mb-10 mx-auto"
        style={{
          boxShadow: "4.82px 4.82px 43.42px 0px #0000000D",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-[#1F1F1F]">
            TRANSACTION HISTORY
          </h2>
          <select className="border border-[#D5D5D5] text-[#2B303466] text-sm px-2 py-1 rounded-md outline-none">
            <option>October</option>
          </select>
        </div>

        <div className="overflow-x-auto rounded-md">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#F6F8FC] text-[#1F1F1F] font-semibold">
              <tr>
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Asset</th>
                <th className="px-4 py-3">Transaction</th>
                <th className="px-4 py-3">Date – Time</th>
                <th className="px-4 py-3">Qty</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-[#3F4765]">
              {transactions.map((tx) => (
                <tr key={tx.no} className="border-b border-[#979797] h-[64px]">
                  <td className="px-4 py-3">{tx.no}</td>
                  <td className="px-4 py-3">{tx.asset}</td>
                  <td className="px-4 py-3">{tx.transaction}</td>
                  <td className="px-4 py-3">{tx.date}</td>
                  <td className="px-4 py-3">{tx.qty}</td>
                  <td className="px-4 py-3">{tx.amount}</td>
                  <td className="px-4 py-3">{tx.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center mt-6 gap-2">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-md bg-[#F6F8FC] text-[#B0B7C3]"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            &lt;
          </button>
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              className={`w-10 h-10 flex items-center justify-center border rounded-md ${
                currentPage === page
                  ? "bg-white border-[#0026FF] text-[#0026FF]"
                  : "bg-[#F6F8FC] text-[#3F4765]"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="w-10 h-10 flex items-center justify-center rounded-md bg-[#F6F8FC] text-[#B0B7C3]"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          >
            &gt;
          </button>
        </div>
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
            <BuySellCard initialTab="Buy" />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
