import React, { useState } from "react";
import { FaBars, FaChartBar, FaQuestionCircle, FaSearch, FaTimes } from 'react-icons/fa';
import { MdReplayCircleFilled } from "react-icons/md";
import Logo from "../Assets/Logo.png";
import ThemeSwitch from "./ThemeSelector";

interface NavbarProps {
  openStatsModal: () => void;
  openHelpModal: () => void;
  openReplayModal: () => void;
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  openStatsModal,
  openHelpModal,
  openReplayModal,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = () => {
    onSearch(searchQuery);
    setSearchQuery("");
  };

  return (
    <nav className="relative z-10 flex flex-wrap items-center justify-between p-3 bg-sky-600 dark:bg-gray-800 lg:py-6 lg:px-10">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img src={Logo} alt="Site Logo" className="h-8 w-8" />
        <span className="font-semibold text-xl tracking-tight ml-2">OneBCVis</span>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white focus:outline-none"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <div className={`${isMenuOpen ? "block" : "hidden"} w-full lg:flex lg:items-center lg:w-auto lg:justify-between flex-grow`}>
        <div className="text-sm lg:flex lg:justify-start lg:flex-grow">
          <button
            className="block mt-4 lg:mt-0 text-white hover:text-gray-200 focus:outline-none mr-4"
            onClick={openStatsModal}
          >
            <FaChartBar className="inline-block mr-1" /> Stats
          </button>
          <button
            className="block mt-4 lg:mt-0 text-white hover:text-gray-200 focus:outline-none mr-4"
            onClick={openHelpModal}
          >
            <FaQuestionCircle className="inline-block mr-1" /> Help
          </button>
          <button
            className="block mt-4 lg:mt-0 text-white hover:text-gray-200 focus:outline-none"
            onClick={openReplayModal}
          >
            <MdReplayCircleFilled className="inline-block mr-1" /> Replay
          </button>
          {/* ThemeSwitch for small screens */}
          <div className="mt-4 lg:hidden">
            <ThemeSwitch />
          </div>
        </div>
        <div className="flex items-center mt-4 lg:mt-0">
          <div className="flex items-center relative w-full lg:w-64">
            <input
              className="border rounded-lg py-1 pl-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white w-full"
              type="text"
              placeholder="Search txn hash ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="p-1.5 bg-sky-600 dark:bg-gray-700 text-white rounded-lg absolute right-0 mr-2"
              onClick={handleSearch}
            >
              <FaSearch />
            </button>
          </div>
        </div>
      </div>
      {/* ThemeSwitch for large screens */}
      <div className="ml-4 mt-4 lg:mt-0 hidden lg:block">
        <ThemeSwitch />
      </div>
    </nav>
  );
};

export default Navbar;
