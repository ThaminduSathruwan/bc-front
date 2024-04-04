import React, { useState } from 'react';
import ethLogo from '../Assets/eth.png';
import Service from '../services/Service';
import Tooltip from '@mui/material/Tooltip';
import DialogBoxModal from './DialogBoxModal';
import TxnView from './TxnView';
import { toast } from 'react-toastify';
import Modal from './Modal';

interface BlockViewProps {
    block: {
        block_hash: string;
        previous_block_hash: string;
        total_amount: number;
        total_fee: number;
        txn_cnt: number;
        time_stamp: string;
        miner: string;
        nonce: number;
        difficulty: number;
        height: number;
        transactions: string[];
        uncles: string[] | null;
        sidecar: SideCar[] | null;
    };
    setBlockData: (blockData: any) => void;
    closeBlockModal: () => void;
    setLoading: (loading: boolean) => void;
    txnTypes: string[];
}

interface SideCar {
    id: string;
    size: number;
}

const BlockView: React.FC<BlockViewProps> = ({ block, setBlockData, closeBlockModal, setLoading, txnTypes }) => {
    const { block_hash, previous_block_hash, total_amount, total_fee, txn_cnt, time_stamp, miner, nonce, difficulty, height, transactions, uncles, sidecar } = block;
    const [txnData, setTxnData] = useState<any[]>([]);
    const [isTxnModalOpen, setIsTxnModalOpen] = useState(false);

    // Function to handle opening Etherscan link in a new window
    const openEtherscanLink = () => {
        const etherscanURL = `https://etherscan.io/block/${block_hash}`;
        window.open(etherscanURL, "_blank");
    };
    
    const getUncleBlock = (blockId: string) => {
        const fetchBlockData = async () => {
            try {
                setLoading(true);
                const response = await Service.getFullBlockData(blockId);
                closeBlockModal();
                setBlockData(response.data);
                setLoading(false);
            } catch (error) {
                toast.error("An error occurred!", { theme: "dark" });
                setLoading(false);
            }
        };
        
        fetchBlockData();
    }
    
    const handleTransactionClick = (txnId: string) => {
        const fetchTransactionData = async () => {
            try {
                setLoading(true);
                const response = await Service.getTransactionData(txnId);
                setTxnData(response.data);
                openTxnModal();
                setLoading(false);
            } catch (error) {
                toast.error("An error occurred!", { theme: "dark" });
                setLoading(false);
            }
        };
        
        fetchTransactionData();
    };
    
        const openTxnModal = () => {
        setIsTxnModalOpen(true);
    };
    
    const closeReplayTxnModal = () => {
        setIsTxnModalOpen(false);
    };
    
    const renderTxnContent = (txnData: any) => {
        return (
            <TxnView txn={txnData} txnTypes={txnTypes}/>
        );
    }
    

    return (
        <div className="mx-auto bg-sky-100 dark:bg-gray-900 text-blue-950 dark:text-white rounded-lg overflow-hidden">
            <div className="lg:p-8 p-4">
                <div className="bg-white dark:bg-black rounded-lg text-center">
                    <h1 className="text-xl font-bold mb-6 p-2">Block Hash: {block_hash}</h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
                    <div>
                        <p className="text-sm text-sky-800 dark:text-gray-500 mb-2">Previous Block Hash</p>
                        <p className="text-lg font-semibold">{previous_block_hash}</p>
                    </div>
                    <div>
                        <p className="text-sm text-sky-800 dark:text-gray-500 mb-2">Miner</p>
                        <p className="text-lg font-semibold">{miner}</p>
                    </div>
                    <div>
                        <p className="text-sm text-sky-800 dark:text-gray-500 mb-2">Total Amount</p>
                        <p className="text-lg font-semibold">{total_amount}</p>
                    </div>
                    <div>
                        <p className="text-sm text-sky-800 dark:text-gray-500 mb-2">Total Fee</p>
                        <p className="text-lg font-semibold">{total_fee}</p>
                    </div>
                    <div>
                        <p className="text-sm text-sky-800 dark:text-gray-500 mb-2">Transaction Count</p>
                        <p className="text-lg font-semibold">{txn_cnt}</p>
                    </div>
                    <div>
                        <p className="text-sm text-sky-800 dark:text-gray-500 mb-2">Nonce</p>
                        <p className="text-lg font-semibold">{nonce}</p>
                    </div>
                    <div>
                        <p className="text-sm text-sky-800 dark:text-gray-500 mb-2">Difficulty</p>
                        <p className="text-lg font-semibold">{difficulty}</p>
                    </div>
                    <div>
                        <p className="text-sm text-sky-800 dark:text-gray-500 mb-2">Time Stamp</p>
                        <p className="text-lg font-semibold">{time_stamp}</p>
                    </div>
                    <div>
                        <p className="text-sm text-sky-800 dark:text-gray-500 mb-2">Height</p>
                        <p className="text-lg font-semibold">{height}</p>
                    </div>
                </div>

                {uncles && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Uncles</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                            {uncles.map((uncle, index) => (
                                <div key={index} className="dark:bg-gray-700 bg-sky-400 p-4 rounded-lg uncle-block hover:bg-gray-400" onClick={() => getUncleBlock(uncle)}>
                                    <span className="text-sm font-semibold cursor-pointer">{uncle}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {sidecar && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Sidecar</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                            {sidecar.map((sc, index) => (
                                <div key={index} className="dark:bg-gray-700 bg-sky-400 p-4 rounded-lg">
                                    <ul className="list-disc list-inside">
                                        <li className="text-sm font-semibold">ID: {sc.id}</li>
                                        <li className="text-sm font-semibold">Size: {sc.size}</li>
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        {transactions.map((txn, index) => (
                            <Tooltip title={txn} key={index}>
                                <div
                                    className="flex items-center dark:bg-gray-700 bg-sky-400 p-4 rounded-lg cursor-pointer"
                                    onClick={() => handleTransactionClick(txn)}
                                >
                                    <img src={ethLogo} alt="Ethereum Logo" className="w-6 h-6" />
                                </div>
                            </Tooltip>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center">
                    <button onClick={openEtherscanLink} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none">
                        View on Etherscan
                    </button>
                </div>
            </div>
            <Modal
                isOpen={isTxnModalOpen}
                title="Transaction Details"
                body={renderTxnContent(txnData) }
                buttons={[]}
                onClose={closeReplayTxnModal}
            />
        </div>
    );
}

export default BlockView;
