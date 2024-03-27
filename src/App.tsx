import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import './index.css'; 
import 'react-toastify/dist/ReactToastify.css';

import Service from './services/Service';

// import components
import Navbar from './components/Navbar';
import DialogBoxModal from './components/DialogBoxModal';
import Stream from './components/Stream';
import Replay from './components/Replay';
import BlockView from './components/BlockView';
import TxnView from './components/TxnView';
import StatsView from './components/StatsView';
import HelpView from './components/HelpView';
import Loading from './components/Loading';

function App() {
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [isBlockOpen, setIsBlockOpen] = useState(false);
  const [isReplayOpen, setIsReplayOpen] = useState(false);
  const [transactionData, setTransactionData] = useState<any | null>(null);
  const [blockData, setBlockData] = useState<any | null>(null);
  const [statsData, setStatsData] = useState<any>();
  const [loading, setLoading] = useState(false);
    
  const openStatsModal = () => {
    const fetchStatsData = async () => {
      try {
        setLoading(true);
        const response = await Service.getStatsData();
        setStatsData(response.data);
        setIsStatsOpen(true);
        setLoading(false);
      } catch (error) {
        toast.error("An error occurred!", { theme: "dark" });
        setLoading(false);
      }
    }
    
    fetchStatsData();
  }
  
  const openHelpModal = () => {
    setIsHelpOpen(true);
  }
  
  const openTransactionModal = () => {
    setIsTransactionOpen(true);
  }
  
  const openBlockModal = () => {
    setIsBlockOpen(true);
  }
  
  const openReplayModal = () => {
    setIsReplayOpen(true);
  }
  
  const closeStatsModal = () => {
    setIsStatsOpen(false);
  }
  
  const closeHelpModal = () => {
    setIsHelpOpen(false);
  }
  
  const closeTransactionModal = () => {
    setIsTransactionOpen(false);
  }
  
  const closeBlockModal = () => {
    setIsBlockOpen(false);
  }
  
  const closeReplayModal = () => {
    setIsReplayOpen(false);
  }
  
  const onSearch = (searchQuery: string) => {
    if (searchQuery.length === 0) {
      toast.error("Please enter a txn hash!", { theme: "dark" });
      return;
    }
    const fetchTransactionData = async () => {
      try {
        setLoading(true);
        const response = await Service.getTransactionData(searchQuery);
        handleSetTransactionData(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("An error occurred!", { theme: "dark" });
        setLoading(false);
      }
    };
        
    fetchTransactionData();
  }
  
  const handleSetTransactionData = (txnData: any) => {
    setTransactionData(txnData);
    openTransactionModal();
  }
  
  const handleSetBlockData = (blockData: any) => {
    setBlockData(blockData);
    openBlockModal();
  }
  
  const renderStatsContent = (statsData: any) => {
    return (
      <StatsView StatsData={statsData} />
    );
  };
  
  const renderTransactionContent = (transactionData: any) => {
    return (
        <TxnView txn={transactionData} />
    );
  }
  
  const renderBlockContent = (blockData: any) => {
    return (
      <BlockView block={blockData} setBlockData={handleSetBlockData} closeBlockModal={closeBlockModal} setLoading={setLoading}/>
    );
  }

  const renderHelpContent = () => {
    return (
      <HelpView />
    );
  }
  
  const renderReplayContent = () => {
    return (
      <Replay setLoading={setLoading}/>
    );
  }
  
  return (
    <div className="App bg-zinc-100 dark:bg-black dark:text-white max-w-full h-screen overflow-hidden"> 
      <Navbar openStatsModal={openStatsModal} openHelpModal={openHelpModal} onSearch={onSearch} openReplayModal={openReplayModal} />
      <Stream setTransactionData={handleSetTransactionData} setBlockData={handleSetBlockData} setLoading={setLoading} />
      <ToastContainer />
      {loading ? <Loading /> : null}
      {/* Dialog Boxes */}
      <DialogBoxModal
        isOpen={isStatsOpen}
        title="Stats"
        body={renderStatsContent(statsData)}
        buttons={[]}
        onClose={closeStatsModal}
      />
      <DialogBoxModal
        isOpen={isHelpOpen}
        title="Help"
        body={renderHelpContent()}
        buttons={[]}
        onClose = {closeHelpModal}
      />
      <DialogBoxModal
        isOpen={isTransactionOpen}
        title="Transaction Details"
        body={transactionData ? renderTransactionContent(transactionData) : <div>Loading...</div>}
        buttons={[]}
        onClose={closeTransactionModal}
      />
      <DialogBoxModal
        isOpen={isBlockOpen}
        title="Block Details"
        body={blockData ? renderBlockContent(blockData) : <div>Loading...</div>}
        buttons={[]}
        onClose={closeBlockModal}
      />
      <DialogBoxModal
        isOpen={isReplayOpen}
        title=""
        body={renderReplayContent()}
        buttons={[]}
        onClose={closeReplayModal}
      />
    </div>
  );
}

export default App;
