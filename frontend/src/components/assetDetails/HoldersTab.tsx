import React from 'react';

interface Holder {
    id: number;
    address: string;
    value: string;
}

interface HoldersTabProps {
    holders: Holder[];
}

const HoldersTab: React.FC<HoldersTabProps> = ({ holders }) => {
    return (
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

export default HoldersTab;