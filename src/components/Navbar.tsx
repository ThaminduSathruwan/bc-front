import React, { useState } from "react";
import { FaChartBar, FaQuestionCircle, FaSearch } from 'react-icons/fa';
import { MdReplayCircleFilled } from "react-icons/md";
import Logo from "../Assets/Logo.png";

interface NavbarProps {
  openStatsModal: () => void;
  openHelpModal: () => void;
  openReplayModal: () => void;
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ openStatsModal, openHelpModal, openReplayModal, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
    setSearchQuery("");
  };

  return (
    <nav className="relative z-10 flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <img src={Logo} alt="Site Logo" className="h-8 w-8" />
        <span className="font-semibold text-xl tracking-tight">OneBCVis</span>
      </div>
      <div className="flex-grow text-center lg:text-left">
        <div className="text-sm">
          <button
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 focus:outline-none mr-4"
              onClick={openStatsModal}
          >
              <FaChartBar className="inline-block mr-1" /> Stats
          </button>
          <button
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 focus:outline-none mr-4"
              onClick={openHelpModal}
          >
              <FaQuestionCircle className="inline-block mr-1" /> Help
          </button>
          <button
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 focus:outline-none"
              onClick={openReplayModal}
          >
              <MdReplayCircleFilled className="inline-block mr-1" /> Replay
          </button>
        </div>
      </div>

      <div className="flex items-center mt-4 lg:mt-0 lg:ml-auto">
        <div className="relative">
          <input
            className="border rounded-lg p-1 pl-8 bg-gray-700 text-white w-64" // Adjust width here
            type="text"
            placeholder="Search txn hash ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-500" />
          </div>
        </div>
        <button
          className="p-1 bg-gray-700 text-white rounded-lg ml-2"
          onClick={handleSearch}
        >
          <FaSearch />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
