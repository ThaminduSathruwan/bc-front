import ApiService from "./ApiService";

const savedTransactions: any[] = [];

export const Service = {
    // get stream data
    // getStreamData: (start_time: string, end_time: string) => ApiService.get(`stream/?start_time=${start_time}&end_time=${end_time}`),

    // get transaction data using txn_hash
    // getTransactionData: (txn_hash: string) => ApiService.get(`transaction/${txn_hash}`),
    
    //get block data using block_hash
    // getBlockData: (block_hash: string) => ApiService.get(`block/${block_hash}/?full=false`),

    //get full block data using block_hash like block/block_hash/?full=true
    // getFullBlockData: (block_hash: string) => ApiService.get(`block/${block_hash}/?full=true`),
    
    //get initial blocks
    // getInitialBlocks: () => ApiService.get('block/initial'),

    //get stats data
    // getStatsData: () => ApiService.get('stats/'),
    
    
    

    // Below are the function for without API calls
    
    // get random 100 transactions and 1 block
    getStreamData: async (start_time: string, end_time: string): Promise<any> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const randomTransactions = Array.from({ length: 75 }, () => Service.generateRandomTransaction());
                const randomBlocks = Array.from({ length: 1 }, () => Service.generateRandomBlock());
                savedTransactions.push(...randomTransactions.map((txn: any) => txn.txn_hash));
                resolve({
                    data: {
                        transactions: randomTransactions,
                        blocks: randomBlocks
                    }
                });
            }, 1000);
        });
    },
    
    // get transaction data using txn_hash API call
    getTransactionData: async (txn_hash: string): Promise<any> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        txn_hash: txn_hash,
                        status: "PENDING",
                        amount: Math.floor(Math.random() * 10) + 5,
                        type: Math.floor(Math.random() * 4),
                        nonce: Math.floor(Math.random() * 100000) + 1,
                        fee: Math.floor(Math.random() * 100) + 1,
                        senders: Array.from({ length: 4 }, () => ({
                            sender_key: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                            amount: 6
                        })),
                        receivers: Array.from({ length: 8 }, () => ({
                            receiver_key: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                            amount: 3
                        }))
                    }
                });
            }, 1000);
        });
    },
    
    // get full block data using block_hash API call
    getFullBlockData: async (block_hash: string): Promise<any> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        block_hash: block_hash,
                        previous_block_hash: (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)),
                        total_amount: Math.floor(Math.random() * 1000) + 1,
                        total_fee: Math.floor(Math.random() * 100000) + 1,
                        txn_cnt: Math.floor(Math.random() * 100000) + 1,
                        time_stamp: new Date().toISOString(),
                        miner: (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)),
                        nonce: Math.floor(Math.random() * 100000) + 1,
                        difficulty: Math.floor(Math.random() * 100000) + 1,
                        height: Math.floor(Math.random() * 100000) + 1,
                        transactions: Array.from({ length: 50 }, () => (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))),
                        uncles: Array.from({ length: 5 }, () => (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))),
                        sidecar: Array.from({ length: 5 }, () => ({
                            id: (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)),
                            size: Math.floor(Math.random() * 100000) + 1
                        }))
                    }
                });
            }, 1000);
        });
    },
    
    // get 5 initial blocks
    getInitialBlocks: async (): Promise<any> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        blocks: Array.from({ length: 5 }, () => Service.generateRandomBlock())
                    }
                });
            }, 1000);
        });
    },
    
    // get stats data
    getStatsData: async (): Promise<any> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        transaction_count:  Math.floor(Math.random() * 100) + 10,
                        block_count: Math.floor(Math.random() * 100) + 1,
                        total_tx_amount: Math.floor(Math.random() * 100) + 100,
                        total_tx_fee: Math.floor(Math.random() * 100) + 1,
                        txn_pool: Math.floor(Math.random() * 100) + 1,
                        miners: [
                            [Math.random().toString(36).substring(2, 15), Math.floor(Math.random() * 100) + 1],
                            [Math.random().toString(36).substring(2, 15), Math.floor(Math.random() * 100) + 1],
                            [Math.random().toString(36).substring(2, 15), Math.floor(Math.random() * 100) + 1],
                            [Math.random().toString(36).substring(2, 15), Math.floor(Math.random() * 100) + 1],
                            [Math.random().toString(36).substring(2, 15), Math.floor(Math.random() * 100) + 1]
                        ]
                    }
                });
            }, 1000);
        });
    },
    
    // generate random transaction
    generateRandomTransaction: (): any => {
        return {
            txn_hash: (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)),
            status: "PENDING",
            amount: Math.floor(Math.random() * 10) + 5,
            type: Math.floor(Math.random() * 4),
            fee: Math.floor(Math.random() * 100) + 1
        };
    },
    
    // generate random block
    generateRandomBlock: (): any => {
        return {
            block_hash: (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)),
            previous_block_hash: (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)),
            //get random Transaction hashes from savedTransactions
            txn_hashes: savedTransactions.splice(Math.floor(Math.random() * savedTransactions.length), Math.floor(Math.random() * savedTransactions.length)),
            total_amount: Math.floor(Math.random() * 1000) + 1,
            total_fee: Math.floor(Math.random() * 100000) + 1,
            txn_cnt: Math.floor(Math.random() * 100000) + 1,
            time_stamp: new Date().toISOString()
        };
    }
};

export default Service;
