import Logo_white from "../../assets/Logo_white.svg";

const Footer = () => {
  return (
    <footer className="bg-pharos-blue text-white text-sm mt-[120px]">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-start">
        {/* Left Side */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <div className="text-2xl font-bold">
              <img src={Logo_white} alt="" />
            </div>
          </div>
          <p className="text-gray-300">
            Tokenize your world, own its—verified by Pharos
          </p>
        </div>

        {/* Right Side */}
        <div className="mt-6 md:mt-0">
          <h4 className="font-semibold mb-2">Help</h4>
          <ul className="space-y-1">
            <li>
              <a href="#" className="hover:underline text-gray-300">
                GitHub
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-gray-300">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-gray-300">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="flex justify-center mt-6">
        <div className="border-t border-gray-400  w-[83%]">
          <p className="text-center text-gray-300 text-xs py-4">
            © Copyright 2025. All Rights Reserved by Versei
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
