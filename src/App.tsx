import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Tooltip from '@mui/material/Tooltip';
import { FaInfoCircle } from "react-icons/fa";

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

interface TransactionType {
  name: string;
  type: number;
}

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
  const [txnTypes, setTxnTypes] = useState<any[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await Service.getInitialData();
        const responseTxnTypes = response.data.txn_types
        const arrayTxnTypes: string[] = [];
        responseTxnTypes.forEach((txnType: TransactionType)  => {
          arrayTxnTypes[txnType.type] = txnType.name;
        });
        setTxnTypes(arrayTxnTypes);
      }catch (error) {
        toast.error("An error occurred!", { theme: "dark" });
      }
    }
    
    fetchInitialData();
  }, [])
    
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
        <TxnView txn={transactionData} txnTypes={txnTypes}/>
    );
  }
  
  const renderBlockContent = (blockData: any) => {
    return (
      <BlockView block={blockData} setBlockData={handleSetBlockData} closeBlockModal={closeBlockModal} setLoading={setLoading} txnTypes={txnTypes}/>
    );
  }

  const renderHelpContent = () => {
    return (
      <HelpView />
    );
  }
  
  const renderReplayContent = () => {
    return (
      <Replay setLoading={setLoading} txnTypes={txnTypes} />
    );
  }
  
  const getTooltipTitle = () => {
    return (
      <div className='text-white text-center rounded-lg'>
        <p>Powered by <a>OneBCVis</a></p>
      </div>
    );
  }
  
  return (
    <div className="App bg-zinc-100 dark:bg-black text-blue-950 dark:text-white max-w-full h-screen overflow-hidden"> 
      <Navbar openStatsModal={openStatsModal} openHelpModal={openHelpModal} onSearch={onSearch} openReplayModal={openReplayModal} />
      <Stream setTransactionData={handleSetTransactionData} setBlockData={handleSetBlockData} setLoading={setLoading} txnTypes={txnTypes} />
      <ToastContainer />
      {/* <div className='fixed bottom-0 right-0 mb-4 mr-4 hidden md:block lg:block z-50'>
        <Tooltip title={getTooltipTitle()} key={1}>
          <FaInfoCircle className="text-2xl hover:text-blue-500 cursor-pointer" />
        </Tooltip>
      </div> */}
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
