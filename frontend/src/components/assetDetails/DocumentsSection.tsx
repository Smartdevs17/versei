import React from 'react';

const DocumentsSection: React.FC = () => {
    return (
        <div className="w-[800px] bg-white text-black rounded-lg p-6 mt-6">
            <h2 className="text-lg font-semibold mb-4">DOCUMENTS</h2>
            <div className="flex space-x-4">
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Year 1 PDF</button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Year 2 PDF</button>
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Year 3 PDF</button>
            </div>
        </div>
    );
};

export default DocumentsSection;