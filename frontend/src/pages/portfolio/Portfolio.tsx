import { useState } from "react";
import DashboardTitle from "../../components/dashboard/DashboardTitle";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
} from "recharts";

const data = [
  { date: "1 Apr", value: 0 },
  { date: "2 Apr", value: 7000 },
  { date: "3 Apr", value: 9000 },
  { date: "4 Apr", value: 16364.77 },
  { date: "5 Apr", value: 7000 },
  { date: "6 Apr", value: 9500 },
  { date: "7 Apr", value: 3000 },
  { date: "8 Apr", value: 7000 },
  { date: "9 Apr", value: 13000 },
  { date: "10 Apr", value: 11000 },
  { date: "11 Apr", value: 8500 },
  { date: "12 Apr", value: 9600 },
];

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0026FF] text-white text-sm px-3 py-1 rounded-md shadow">
        {payload[0].value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })}
      </div>
    );
  }
  return null;
};

const Portfolio = () => {
  const [range, setRange] = useState("30days");

  const assets = [
    {
      no: 1,
      asset: "Sunny Hills Vineyard",
      portfolio: "50%",
      portfolioColor: "bg-[#0026FF]",
      quantity: 20,
      price: "$23,575.46",
      locked: "100 days",
      value: "$34,295",
    },
    {
      no: 2,
      asset: "Vintage Car",
      portfolio: "30%",
      portfolioColor: "bg-[#FF0000]",
      quantity: 50,
      price: "$23,575.46",
      locked: "40 days",
      value: "$34,295",
    },
    {
      no: 3,
      asset: "Downtown Condo",
      portfolio: "20%",
      portfolioColor: "bg-[#FFD700]",
      quantity: 48,
      price: "$23,575.46",
      locked: "95 days",
      value: "$34,295",
    },
  ];

  return (
    <>
      <DashboardTitle
        title="Portfolio"
        subtitle="Track your assets"
        buttonText="BUY NEW ASSET"
        onClick={() => console.log("Buy new asset clicked")}
      />

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
          <select
            className="border border-[#D5D5D5] text-[#2B303466] text-sm px-2 py-1 rounded-md outline-none"
            value={range}
            onChange={(e) => setRange(e.target.value)}
          >
            <option value="30days">30days</option>
            <option value="7days">7days</option>
          </select>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <defs>
              <linearGradient id="gradientBlue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0026FF" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#0026FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip active={undefined} payload={undefined} />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#0026FF"
              fill="url(#gradientBlue)"
              activeDot={{ r: 6, strokeWidth: 2, fill: "#0026FF" }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0026FF"
              dot={{ fill: "#0026FF", r: 4 }}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div
        className="bg-white p-8 rounded-xl w-full mt-8 mx-auto mb-10"
        style={{
          boxShadow: "4.82px 4.82px 43.42px 0px #0000000D",
        }}
      >
        <h2 className="text-lg font-semibold text-[#1F1F1F] mb-4">MY ASSETS</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm bg-[#F1F4F9] h-[32px] rounded-[8px]">
              <th className="py-2 text-center">No</th>
              <th className="py-2">Asset</th>
              <th className="py-2">Portfolio%</th>
              <th className="py-2">Quantity</th>
              <th className="py-2">Price</th>
              <th className="py-2">Locked</th>
              <th className="py-2 text-center">Value</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.no} className="text-[#1F1F1F] text-sm border-b border-[#979797] h-[64px]">
                <td className="py-2 text-center">{asset.no}</td>
                <td className="py-2">{asset.asset}</td>
                <td className="py-2 flex items-center">
                  {asset.portfolio}
                  <span
                    className={`ml-2 h-2 w-10 rounded ${asset.portfolioColor}`}
                  ></span>
                </td>
                <td className="py-2">{asset.quantity}</td>
                <td className="py-2">{asset.price}</td>
                <td className="py-2">{asset.locked}</td>
                <td className="py-2 text-center">{asset.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Portfolio;
