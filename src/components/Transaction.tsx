import * as d3 from "d3";
import React, { useEffect } from "react";

interface TransactionProps {
    transaction: {
        txn_hash: string;
        status: string;
        amount: number;
        type: number;
        fee: number;
    }[];
    addTransactionToPool: (txn: any) => void;
    txnTypes: string[];
}

const Transaction: React.FC<TransactionProps> = ({ transaction, addTransactionToPool, txnTypes }) => {
    const svgRef = React.useRef<SVGSVGElement>(null);

    useEffect(() => {
        const svg = d3.select(svgRef.current);

        // Define transaction color based on txn_type
        // const colorScale = d3.scaleOrdinal<string>()
        //     .domain(transaction.map(txn => txnTypes[txn.type]))
        //     .range(d3.schemeCategory10);
        
        // Define transaction color based on txn_type
        const colorScale = d3.scaleOrdinal<string>()
            .domain(Object.values(txnTypes)) // Use the values of txnTypes as the domain
                .range(d3.schemeCategory10);

        // Draw transaction circles
        svg.selectAll("circle")
            .data(transaction)
            .enter()
            .append("circle")
            .attr('cx', () => Math.random() * window.innerWidth)
            .attr('cy', () => Math.random() * window.innerHeight)
            .attr('r', txn => txn.amount)
            .attr('fill', txn => colorScale(txnTypes[txn.type]))
            .attr('opacity', 0.5);

        // Transaction move animation
        function moveTransaction() {
            svg.selectAll("circle")
                .each(function (txn: any) {
                    const circle = d3.select(this);
                    const currentCx = +circle.attr('cx');
                    const currentCy = +circle.attr('cy');
                    const newCy = currentCy + txn.amount / 2;
                    if (newCy >= window.innerHeight-25) {
                        // If the transaction is outside the window, remove it
                        transaction.splice(transaction.findIndex(t => t.txn_hash === txn.txn_hash), 1);
                        addTransactionToPool({ ...txn, txn_color: colorScale(txnTypes[txn.type]) });
                        circle.remove();
                    }
                    else {
                        circle.attr('cy', newCy);
                    }
                });
        }

        // Move transactions every 50ms
        const intervalId = setInterval(moveTransaction, 50);

        return () => {
            clearInterval(intervalId);
        };
    }, [transaction]);

    return (
        <svg ref={svgRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" />
    );
};

export default Transaction;
