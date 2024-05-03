import React, { useState } from "react";
import Service from "../services/Service";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";

interface PoolTransactionProps {
    poolTransaction: {
        txn_hash: string;
        status: string;
        amount: number;
        type: number;
        fee: number;
        txn_color: string;
    }[];
    setTransactionData: (txnData: any) => void;
    count: number;
    setLoading: (loading: boolean) => void;
    txnTypes: string[];
}

const TransactionPool: React.FC<PoolTransactionProps> = ({ poolTransaction, setTransactionData, count, setLoading, txnTypes }) => {

    const handleTransactionClick = (txnId: string) => {
        const fetchTransactionData = async () => {
            try {
                setLoading(true);
                const response = await Service.getTransactionData(txnId);
                setTransactionData(response.data);
                setLoading(false);
            } catch (error) {
                toast.error("An error occurred!", { theme: "dark" });
                setLoading(false);
            }
        };
        
        fetchTransactionData();
    };
    
    // Return tooltip title using txn data
    const getTooltipTitle = (txn: any) => {
        return (
            <div className="text-white text-center rounded-lg">
                <p className="mb-1">Transaction Hash: <span className="text-gray-300">{txn.txn_hash}</span></p>
                <p className="mb-1">Transaction Type: <span className="text-gray-300">{txnTypes[txn.type]}</span></p>
                <p className="mb-1">Transaction Fee: <span className="text-gray-300">{txn.fee}</span></p>
                <p className="mb-1">Transaction Amount: <span className="text-gray-300">{txn.amount}</span></p>
            </div>
        );
    };
    
    return (
        // <div className="absolute bottom-0 left-0 w-full max-h-80 overflow-y-auto">
        <div className="absolute bottom-0 left-0 w-full overflow-y-auto max-h-80">
            {/* <h1 className="text-left text-xl p-2">Transaction Mempool ({poolTransaction.length} transactions)</h1> */}
            <h1 className="text-left text-lg p-2">Transactions in the Mempool (showing {poolTransaction.length}) </h1>
                <div className="flex flex-wrap justify-center items-center p-2 rounded-lg">
                    {poolTransaction.map((txn, index) => (
                        <Tooltip
                            title={getTooltipTitle(txn)}
                            key={index}>
                                <div key={index} className="m-1">
                                    <button onClick={() => handleTransactionClick(txn.txn_hash)}>
                                        <svg width={txn.amount} height={txn.amount}>
                                            <circle cx={txn.amount / 2} cy={txn.amount / 2} r={txn.amount / 2} fill={txn.txn_color} />
                                        </svg>
                                    </button>
                                </div>
                        </Tooltip>
                    ))}
            </div>
        </div>
    );
};

export default TransactionPool;