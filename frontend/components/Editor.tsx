'use client';

import { useState, useEffect } from 'react';
import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode';
import Modal from './Modal';
import AddActionButton from './buttons/AddActionButton';

// TODO: make this flow dynamic, currently it only supports static event selection

const initialNodes = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        data: { label: <CustomNode title="Trigger" index={1} onClick={() => alert("Trigger")}>Select the event that starts your Zap</CustomNode> },
        width: 500,
        style: {
            fontSize: 20,
        },
    },
    {
        id: '2',
        position: { x: 0, y: 0 },
        data: { label: <CustomNode title="Action" index={2} onClick={() => alert("Action")}>Select the event that starts your Zap</CustomNode> },
        width: 500,
        style: {
            fontSize: 20,
        },
    },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2', label: <AddActionButton /> }];

export default function Editor() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedNodeEvent, setSelectedNodeEvent] = useState<string | null>(null);
    const [triggerTitle, setTriggerTitle] = useState<string>("Trigger");
    const [actionTitle, setActionTitle] = useState<string>("Action");
    const [selectedTriggerDesc, setSelectedTriggerDesc] = useState<string>("Select the event that starts your Zap");
    const [selectedActionDesc, setSelectedActionDesc] = useState<string>("Select the event for your Zap to run");
    const [centerX, setCenterX] = useState(0);
    const [centerY, setCenterY] = useState(0);


    useEffect(() => {
        const setNodeInCenter = () => {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            setCenterX(viewportWidth / 2);
            setCenterY(viewportHeight / 2);

            setNodes([
                {
                    id: 'webhooks',
                    position: { x: centerX - 255, y: centerY - 280 },
                    data: {
                        label: <CustomNode title={triggerTitle} index={1} onClick={() => {
                            setSelectedNodeEvent('webhooks');
                            setIsModalOpen(true);
                        }}>{selectedTriggerDesc}</CustomNode>,
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
                        label: <CustomNode title={actionTitle} index={2} onClick={() => {
                            setSelectedNodeEvent('email');
                            setIsModalOpen(true);
                        }}>{selectedActionDesc}</CustomNode>,
                    },
                    width: 500,
                    style: {
                        fontSize: 20,
                    },
                },
            ]);

            setEdges([{ id: 'e1-2', source: 'webhooks', target: 'email', label: <AddActionButton /> }])
        };
        setNodeInCenter();

        window.addEventListener('resize', setNodeInCenter);

        return () => {
            window.removeEventListener('resize', setNodeInCenter);
        };
    }, [triggerTitle, actionTitle, selectedActionDesc, selectedTriggerDesc, centerX, centerY]);

    const handleModalSelect = (selectedEvent: string) => {
        console.log(`Event selected for node ${selectedNodeEvent}: ${selectedEvent}`);
        if (selectedEvent === 'Webhooks by Rapidflow') {
            setTriggerTitle(selectedEvent);
            setSelectedTriggerDesc("Select the event");
        } else if (selectedEvent === "Gmail") {
            setActionTitle(selectedEvent);
            setSelectedActionDesc("Select the event");
        }
        setIsModalOpen(false);
    };

    return (
        <div style={{ height: '91vh', width: '100vw', overflow: 'hidden', margin: 0, position: 'relative' }}>
            <ReactFlow
                edges={edges}
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
