import React from 'react';
import { FaGithub } from 'react-icons/fa'; 
import { FiMail } from 'react-icons/fi'; 

const HelpView = () => {
    return (
        <div className="max-w-screen-lg mx-auto px-4 text-sky-900 dark:text-gray-300">            
            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4">Getting Started</h2>
                <p className="text-lg mb-6">To begin exploring the Blockchain Visualizer, simply enter a transaction ID or block hash in the search bar. The visualizer will then display the transaction details or block information, allowing you to interactively explore the blockchain.</p>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4">FAQs</h2>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Q: What blockchain networks does the visualizer support?</h3>
                    <p className="text-lg">A: Our visualizer currently supports popular blockchain networks such as Ethereum and Bitcoin. We're continuously expanding our support to include more networks in the future.</p>
                </div>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Q: How frequently is the blockchain data updated?</h3>
                    <p className="text-lg">A: The blockchain data displayed in our visualizer is updated in real-time, ensuring that you have access to the latest information.</p>
                </div>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Q: Is the Blockchain Visualizer free to use?</h3>
                    <p className="text-lg">A: Yes, our Blockchain Visualizer is completely free to use. We believe in providing open access to blockchain information for everyone.</p>
                </div>
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Q: How can I contribute to the development of the visualizer?</h3>
                    <p className="text-lg">A: We welcome contributions from the community! You can contribute to the development of the visualizer by submitting bug reports, feature requests, or even code contributions on our GitHub repository.</p>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
                <p className="text-lg mb-6">If you have any further questions or encounter any issues while using our Blockchain Visualizer, please don't hesitate to contact our support team. We're here to help!</p>
                <div className="flex items-center mb-4">
                    <FaGithub className="text-3xl mr-2" />
                    <p className="text-lg"><a href="https://github.com/OneBCVis" target="_blank" rel="noopener noreferrer" className="underline">GitHub Organization: OneBCVis</a></p>
                </div>
                <div className="flex items-center">
                     <FiMail className="text-3xl mr-2" />
                    <p className="text-lg">Support Email: <a href="mailto:onebcviz@gmail.com" className="underline">onebcviz@gmail.com</a></p>
                </div>
            </section>
        </div>
    );
}

export default HelpView;
