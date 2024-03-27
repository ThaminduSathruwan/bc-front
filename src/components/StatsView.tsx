import React from 'react';
import Chart from "react-google-charts";

interface StatsViewProps {
    StatsData: StatsData;
}

interface StatsData {
    transaction_count: number;
    block_count: number;
    total_tx_amount: number;
    total_tx_fee: number;
    txn_pool: number;
    miners: string[][];
}

const StatsView: React.FC<StatsViewProps> = ({ StatsData }) => {
    const { transaction_count, block_count, total_tx_amount, total_tx_fee, txn_pool, miners } = StatsData;
    
    return (
      <div className="max-w-screen-lg mx-auto px-4 dark:text-white">
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="dark:bg-gray-800 bg-sky-400 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Transaction Count (Last 1 Hour)</h3>
            <p className="text-3xl">{transaction_count}</p>
          </div>
          <div className="dark:bg-gray-800 bg-sky-400 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Block Count (Last 1 Hour)</h3>
            <p className="text-3xl">{block_count}</p>
          </div>
          <div className="dark:bg-gray-800 bg-sky-400 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Total Transaction Amount (Last 1 Hour)</h3>
            <p className="text-3xl">{total_tx_amount}</p>
          </div>
          <div className="dark:bg-gray-800 bg-sky-400 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Total Transaction Fee (Last 1 Hour)</h3>
            <p className="text-3xl">{total_tx_fee}</p>
          </div>
          <div className="dark:bg-gray-800 bg-sky-400 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">Transaction Pool</h3>
            <p className="text-3xl">{txn_pool}</p>
          </div>
        </div>
        <div className="mt-8">
          <div className="w-full h-auto mx-auto">
            <Chart
              width={'100%'}
              height={'500px'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ['Miner', 'Blocks'],
                ...miners.map(miner => [miner[0], miner[1]])
              ]}
              options={{
                title: 'Top Miners (Last 1000 Blocks)',
                backgroundColor: 'transparent',
                legend: { textStyle: { color: 'blue', fontSize: 14 } },
                titleTextStyle: { color: 'blue', fontSize: 24, bold: true },
                pieSliceTextStyle: { color: 'white', fontSize: 16 },
                pieSliceBorderColor: 'transparent',
                tooltip: { text: 'value' },
                pieHole: 0.4, 
                pieSliceText: 'percentage',
              }}
              rootProps={{ 'data-testid': '1' }}
            />
          </div>
        </div>
      </div>
    );
}

export default StatsView;
