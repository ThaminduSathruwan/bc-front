import React from "react";

interface DialogBoxModalProps {
  isOpen: boolean;
  title: string;
  body: React.ReactNode;
  buttons: { text: string; onClick: () => void }[];
  onClose: () => void;
  width?: string;
  height?: string;
}

const Modal: React.FC<DialogBoxModalProps> = ({ isOpen, title, body, buttons, onClose, width = 'max-w-2xl', height = 'h-[calc(100%-1rem)]' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full" aria-hidden="true">
      <div className={`relative p-4 w-full ${width} ${height} max-h-full`}>
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-start justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={onClose}
            >
              <svg className="w-6 h-6" aria-hidden="true" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="sr-only">Close</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            {body}
          </div>
          <div className="flex items-center p-4 md:p-5 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
            {buttons.map((button, index) => (
              <button
                key={index}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={button.onClick}
              >
                {button.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
