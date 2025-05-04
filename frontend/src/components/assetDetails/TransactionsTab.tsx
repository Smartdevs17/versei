import React from 'react';

interface Transaction {
    id: number;
    type: string;
    address: string;
    dateTime: string;
    value: string;
}

interface TransactionsTabProps {
    transactions: Transaction[];
}

const TransactionsTab: React.FC<TransactionsTabProps> = ({ transactions }) => {
    return (
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
            <div className="flex justify-center mt-4 space-x-2">
                <button className="px-2 py-1 border rounded text-gray-500">&lt;</button>
                <button className="px-2 py-1 border rounded bg-blue-500 text-white">1</button>
                <button className="px-2 py-1 border rounded text-gray-500">2</button>
                <button className="px-2 py-1 border rounded text-gray-500">3</button>
                <button className="px-2 py-1 border rounded text-gray-500">4</button>
                <button className="px-2 py-1 border rounded text-gray-500">&gt;</button>
            </div>
        </>
    );
};

export default TransactionsTab;