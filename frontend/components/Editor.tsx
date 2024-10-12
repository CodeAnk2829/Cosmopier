'use client';

import { useState, useEffect } from 'react';
import { ReactFlow, Controls, Background, } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode';

const initialNodes = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        data: { label: <CustomNode  title="Trigger" onClick={() => {
            alert("Trigger")
        }}>Select the event that starts your Zap</CustomNode> },
        width: 500,
        style: {
            fontSize: 20
        },
    },
    {
        id: '2',
        position: { x: 0, y: 0 },
        data: { label: <CustomNode  title="Action" onClick={() => {
            alert("Action")
        }}>Select the event that starts your Zap</CustomNode> },
        width: 500,
        style: {
            fontSize: 20
        },
    },
]


export default function Editor() {
    const [nodes, setNodes] = useState(initialNodes);

   

    useEffect(() => {
        const setNodeInCenter = () => {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            const centerX = viewportWidth / 2;
            const centerY = viewportHeight / 2;
            setNodes([
                {
                    id: '1',
                    position: { x: centerX - 255, y: centerY - 280 }, 
                    data: {
                        label: <CustomNode title="Trigger" onClick={() => {
                            alert("hello")
                        }}>Select the event that starts your Zap</CustomNode>
                    },
                    width: 500,
                    style: {
                        fontSize: 20
                    } 
                },
                {
                    id: '2',
                    position: { x: centerX - 255, y: centerY - 10 },
                    data: {
                        label: <CustomNode title="Action" onClick={() => {
                            alert("Action")
                        }}>Select the event for your Zap to run</CustomNode>
                    },
                    width: 500,
                    style: {
                        fontSize: 20
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

    return (
        <div style={{ height: '91vh', width: '100vw', overflow: 'hidden', margin: 0}}>
            <ReactFlow
                nodes={nodes}
                colorMode='dark'
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}
