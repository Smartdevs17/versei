import Button from "../../components/button/Button";
import NavBar from "../../layout/components/NavBar";
import herro_bg from "../../assets/home/hero_logo.svg";
import DiscoverAssets from "../../components/home/DiscoverAssets";
import HowItWorks from "../../components/home/HowItWorks";
import RectangleBg from "../../assets/Rectangle 412.svg";
import Footer from "../../layout/components/Footer";

const Home = () => {
  return (
    <>
      <NavBar />
      <div
        className="px-[150px] h-screen flex items-center justify-center"
        style={{
          background: "#2FD0DC1F",
          backdropFilter: "blur(500px)",
        }}
      >
        <div className="flex-1 flex flex-col">
          <div className="w-[600px]">
            <p className="text-pharos-gray font-bold text-[14px] uppercase m-0">
              Craft wealth from real world assets
            </p>
            <p className="font-bold text-[64px] m-0 mt-[20px]">
              Access Tokenize <br /> Real world Assets
            </p>
          </div>

          <div className="flex items-center gap-[15px] w-[600px] mt-[50px]">
            <Button>TOKENIZE YOUR ASSETS</Button>
            <Button variant="outline">START INVESTING</Button>
          </div>
        </div>

        <div className="flex-1 flex justify-end">
          <img className="w-[542px] h-[542px]" src={herro_bg} alt="" />
        </div>
      </div>

      <DiscoverAssets />

      <div className="mt-32">
        <HowItWorks />
      </div>

      <div className="px-[150px] flex items-center justify-center mt-[80px] mb-[120px]">
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

            <Button
              variant="outline"
              borderColor="#7B8CE5"
              textColor="pharo-white"
            >
              START INVESTING
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
