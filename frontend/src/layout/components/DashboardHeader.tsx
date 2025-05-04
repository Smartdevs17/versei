import { useEffect, useState } from "react";

// Extend the Window interface to include the ethereum property
declare global {
  interface Window {
    ethereum?: any;
  }
}
import { BrowserProvider } from "ethers";
import versei_logo from "../../assets/versie_logo.svg";
import Button from "../../components/button/Button";
import NavBarSearchInput from "./NavBarSearchInput";
import icon_notification from "../../assets/nav/Icon_notification.svg";
import profile_prefill from "../../assets/nav/Bg.svg";
import chevron_down from "../../assets/nav/chevron_down.svg";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert("Please install MetaMask to connect your wallet.");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected wallet from MetaMask
          setWalletAddress(null);
        } else {
          setWalletAddress(accounts[0]);
        }
      });

      window.ethereum.on("disconnect", () => {
        setWalletAddress(null);
      });
    }
  }, []);

  return (
    <div className="bg-pharo-white h-[120px] w-full px-[150px] border-b border-[#1B255E33] sticky top-0 z-10">
      <div className="h-full flex items-center justify-between">
        {/* Logo */}
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <img src={versei_logo} alt="VERSEI LOGO" />
        </div>

        {/* Middle Section: Search + Icons */}
        <div className="flex items-center gap-[50px]">
          <NavBarSearchInput />

          <div className="flex items-center gap-[36px]">
            <img
              src={icon_notification}
              alt="Notification"
              className="cursor-pointer"
            />

            <div className="flex items-center gap-[10px] cursor-pointer">
              <img src={profile_prefill} alt="Profile" />
              <p className="font-semibold text-[14px] text-[#3F4765] flex items-center gap-[5px]">
                {walletAddress
                  ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                  : "0x0....0000"}
                <img src={chevron_down} alt="Chevron" />
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Button */}
        <div>
          <Button
            className="h-[24px]"
            variant="solid"
            onClick={walletAddress ? disconnectWallet : connectWallet}
          >
            {walletAddress ? "DISCONNECT" : "CONNECT WALLET"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
