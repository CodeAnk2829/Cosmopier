'use client';

import { useState, useEffect } from 'react';
import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';


export default function Editor() {
    const [nodes, setNodes] = useState([
        {
            id: '1',
            position: { x: 0, y: 0 },
            data: { label: 'Hello' },
            width: 400,
            height: 80,
            style: {
                background: '#fff',
                fontSize: 20,
            },
        },
    ]);

    useEffect(() => {
        const setNodeInCenter = () => {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            const centerX = viewportWidth / 2;
            const centerY = viewportHeight / 2;
            setNodes([
                {
                    id: '1',
                    position: { x: centerX - 75, y: centerY - 40 }, 
                    data: { label: 'Hello' },
                    width: 400,
                    height: 80,
                    style: {
                        background: '#fff',
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

    return (
        <div style={{ height: '91vh', width: '100vw', overflow: 'hidden', margin: 0}} className='text-slate-500 font-semibold'>
            <ReactFlow
                nodes={nodes}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}
