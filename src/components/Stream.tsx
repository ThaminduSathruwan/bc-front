import React, { useEffect, useState } from "react";
import Service from "../services/Service";
import Transaction from "./Transaction";
import BlockCarousel from "./BlockCarousel";
import Card from "./Card";
import TransactionPool from "./TransactionPool";
import { toast } from "react-toastify";

interface StreamProps {
    setTransactionData: (txnData: any) => void;
    setBlockData: (blockData: any) => void;
    setLoading: (loading: boolean) => void;
}

const Stream: React.FC<StreamProps> = ({setTransactionData, setBlockData, setLoading}) => {
    const [transaction, setTransaction] = useState<any[]>([]);
    const [block, setBlock] = useState<any[]>([]);
    const [isInitialBlocksSet, setIsInitialBlocksSet] = useState<boolean>(false);
    const [transactionPool, setTransactionPool] = useState<any[]>([]);
    const [initialTime, setInitialTime] = useState(new Date());
    const [count, setCount] = useState(0);
    
    const updateCount = (newCount: number) => {
        setCount(count + newCount);
    }
    
    const addTransactionToPool = (txn: any) => {
        setTransactionPool(prevTransactionPool => [...prevTransactionPool, txn]);
    };
    
    const addBlock = (newBlocks: any) => {
        setBlock(prevBlock => [...prevBlock, ...newBlocks]);
    };
    
    useEffect(() => {
        const fetchInitialBlocks = async () => {
            try {
                const response = await Service.getInitialBlocks();
                addBlock(response.data.blocks);
            } catch (error) {
                toast.error("An error occurred!", { theme: "dark" });
            }
        }
        
        if (!isInitialBlocksSet) {
            fetchInitialBlocks();
            setIsInitialBlocksSet(true);
        }
    }, []);
    
    useEffect(() => {
        const fetchStreamData = async () => {
            try {
                const current_time = new Date();
                const start_time = initialTime.toISOString();
                const end_time = current_time.toISOString();
                setInitialTime(current_time);
                const response = await Service.getStreamData(start_time, end_time);
                setTransaction(response.data.transactions);
                // updateCount(streamData.transactions.length);
                const blocks = response.data.blocks;
                addBlock(blocks);
                const txnsToRemove: string[] = [];
                for (let i = 0; i < blocks.length; i++) {
                    txnsToRemove.push(blocks[i].txn_hashes);
                }
                setTransactionPool(prevTransactionPool => prevTransactionPool.filter(txn => !txnsToRemove[0].includes(txn.txn_hash)));

            } catch (error) {
                toast.error("An error occurred!", { theme: "dark" });
            }
        };
        
        const intervalId = setInterval(fetchStreamData, 2000);
        return () => {
            clearInterval(intervalId);
        };
    }, [initialTime]);
    
    return (
        <div className="container mx-auto">
            <Transaction transaction={transaction} addTransactionToPool={addTransactionToPool} />
            <TransactionPool poolTransaction={transactionPool} setTransactionData={setTransactionData} count={count} setLoading={setLoading}/>
            <div className='flex items-center justify-center mt-8'>
                <BlockCarousel>
                    {block.map((b, index) => (
                        <Card
                            key={index}
                            title={b.block_hash}
                            content={b}
                            setBlockData={setBlockData}
                            setLoading={setLoading}
                        />
                    ))}
                </BlockCarousel>
            </div>
        </div>
    );
};

export default Stream;
