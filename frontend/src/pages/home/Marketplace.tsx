import React from 'react'
import NavBar from '../../layout/components/NavBar'
import Button from '../../components/button/Button'
import RectangleBg from "../../assets/Rectangle 412.svg";
import Footer from '../../layout/components/Footer'
import SearchBar from '../../components/search/SearchBar';
import herro_bg from "../../assets/home/hero_logo.svg";
import AssetsSection from '../../components/marketplaceCards/AssetsSection';

const Marketplace = () => {
    return (

        <>
            <NavBar />

            <section className="relative flex flex-col items-center justify-center min-h-screen bg-[#2FD0DC1F] text-[#333739] px-4 overflow-hidden">
                {/* Background ripple image */}
                <div className="absolute w-[542px] h-[542px] animate-ripple pointer-events-none">
                    <img className="w-full h-full object-cover opacity-40" src={herro_bg} alt="" />
                </div>

                <div className="text-center mb-4">
                    <p className="text-sm font-medium text-gray-400">
                        VERSEI TVL: <span>$2.65M</span>
                    </p>
                </div>

                <h1 className="text-5xl font-extrabold text-center mb-4">
                    Explore All Assets
                </h1>

                <p className="text-gray-400 text-center mb-10 max-w-md">
                    Discover tokenized assets and treasures verified on Versei
                </p>

                <SearchBar />
            </section>



            <div className='px-[150px]'>
                <AssetsSection />
                </div>



            <div className="px-[150px] flex items-center justify-center mt-[80px]">
                <div
                    className="w-full bg-center bg-cover flex justify-center items-center h-[440px] rounded-[8px] flex-col gap-10"
                    style={{ backgroundImage: `url(${RectangleBg})` }}
                >
                    <p className="font-bold text-[60px] text-pharo-white text-center leading-[70px] text-ph">
                        Start Your <br /> Tokenization Journey
                    </p>

                    <div className="flex items-center gap-5">
                        <Button variant="solid" bgColor="pharo-white" textColor="#202224">
                            TOKENIZE YOUR ASSET
                        </Button>

                        <Button variant="outline" borderColor="#7B8CE5" textColor="pharo-white">
                            START INVESTING
                        </Button>
                    </div>
                </div>
            </div>

            <Footer />

        </>
    )
}

export default Marketplace