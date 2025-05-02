import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <div className="bg-white rounded-xl px-6 py-4 w-full h-[128px] flex flex-col justify-center items-start">
      <p className="text-xs uppercase text-gray-500 tracking-wider mb-1">{title}</p>
      <p className="text-xl font-semibold text-gray-800">{value}</p>
    </div>
  );
};

export default StatCard;
