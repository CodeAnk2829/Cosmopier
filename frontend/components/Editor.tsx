'use client';

import { useState, useEffect } from 'react';
import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode';
import Modal from './Modal';

const initialNodes = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        data: { label: <CustomNode title="Trigger" onClick={() => alert("Trigger")}>Select the event that starts your Zap</CustomNode> },
        width: 500,
        style: {
            fontSize: 20,
        },
    },
    {
        id: '2',
        position: { x: 0, y: 0 },
        data: { label: <CustomNode title="Action" onClick={() => alert("Action")}>Select the event that starts your Zap</CustomNode> },
        width: 500,
        style: {
            fontSize: 20,
        },
    },
];

export default function Editor() {
    const [nodes, setNodes] = useState(initialNodes);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedNodeEvent, setSelectedNodeEvent] = useState<string | null>(null);

    useEffect(() => {
        const setNodeInCenter = () => {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            const centerX = viewportWidth / 2;
            const centerY = viewportHeight / 2;
            setNodes([
                {
                    id: 'webhooks',
                    position: { x: centerX - 255, y: centerY - 280 },
                    data: {
                        label: <CustomNode title="Trigger" onClick={() => {
                            setSelectedNodeEvent('webhooks');
                            setIsModalOpen(true);
                        }}>Select the event that starts your Zap</CustomNode>,
                    },
                    width: 500,
                    style: {
                        fontSize: 20,
                    },
                },
                {
                    id: 'email',
                    position: { x: centerX - 255, y: centerY - 10 },
                    data: {
                        label: <CustomNode title="Action" onClick={() => {
                            setSelectedNodeEvent('email');
                            setIsModalOpen(true);
                        }}>Select the event for your Zap to run</CustomNode>,
                    },
                    width: 500,
                    style: {
                        fontSize: 20,
                    },
                },
            ]);
        };
        setNodeInCenter();

        window.addEventListener('resize', setNodeInCenter);

        return () => {
            window.removeEventListener('resize', setNodeInCenter);
        };
    }, []);

    const handleModalSelect = (selectedEvent: string) => {
        console.log(`Event selected for node ${selectedNodeEvent}: ${selectedEvent}`);
        setIsModalOpen(false);
    };

    return (
        <div style={{ height: '91vh', width: '100vw', overflow: 'hidden', margin: 0, position: 'relative' }}>
            <ReactFlow
                nodes={nodes}
                colorMode="dark"
                style={{ pointerEvents: isModalOpen ? 'none' : 'auto' }} 
            >
                <Background />
                <Controls />
            </ReactFlow>

            {isModalOpen && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Modal
                        onClose={() => setIsModalOpen(false)}
                        onEventSelect={handleModalSelect}
                    />
                </div>
            )}
        </div>
    );
}
