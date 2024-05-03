// DialogBoxModal.tsx

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

const DialogBoxModal: React.FC<DialogBoxModalProps> = ({ isOpen, title, body, buttons, onClose, width='90%', height='90%'}) => {
  if (!isOpen) return null;

  const WHStyle = {
    width: width,
    height: height,
  };

  return (
    <div className="fixed inset-0 z-40 dark:bg-gray-800 bg-sky-800 bg-opacity-50 dark:bg-opacity-50 flex justify-center items-center">
      <div className="dark:bg-black bg-sky-100 border border-white rounded-lg relative" style={WHStyle}>
        <button
          className="absolute top-0 right-0 p-2 focus:outline-none"
          onClick={onClose}
          aria-label="Close"
        >
          {/* Replace with your close icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white-500 hover:text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.707 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="overflow-auto h-full">
          <div className="flex justify-center items-center p-4">
            <h1 className="text-4xl font-bold">{title}</h1>
          </div>
          <div className="p-6">{body}</div>
          <div className="mt-4 flex justify-end">
            {buttons.map((button, index) => (
              <button
                key={index}
                className="px-4 py-2 mr-2 dark:bg-gray-500 bg-sky-500 text-white rounded hover:bg-gray-600"
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

export default DialogBoxModal;
