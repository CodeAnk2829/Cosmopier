"use client";

import React from 'react';

interface ModalProps {
    onClose: () => void;
    onEventSelect: (selectedEvent: string) => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, onEventSelect }) => {
    return (
        <div className="fixed inset-0 bg-neutral-950 bg-opacity-70 flex justify-center items-center z-50 ">
            <div className="bg-zinc-900 rounded-lg p-6 text-slate-400">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Choose your event</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white"
                    >
                        &times;
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Search 7,000+ apps and tools..."
                    className="w-full bg-gray-700 text-white p-2 mb-4 rounded"
                />

                <div className="flex justify-between text-sm mb-2">
                    <p>Your top apps</p>
                    <p className="text-blue-500 cursor-pointer">Browse all</p>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                    <button onClick={() => onEventSelect('Gmail')} className="bg-gray-700 p-2 rounded">
                        Gmail
                    </button>
                </div>

                <div className="text-sm">
                    <h3 className="font-bold mb-2">Popular built-in tools</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => onEventSelect('Webhooks by Rapidflow')} className="bg-gray-700 p-2 rounded">Webhooks by Rapidflow</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
