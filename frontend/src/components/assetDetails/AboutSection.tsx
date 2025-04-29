import React from 'react';

const AboutSection: React.FC = () => {
    return (
        <div className="w-[800px] bg-white text-black rounded-lg p-6 mt-6">
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
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Agriculture</button>
            </div>
        </div>
    );
};

export default AboutSection;