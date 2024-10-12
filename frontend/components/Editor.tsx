'use client';

import { useState, useEffect, useCallback } from 'react';
import { ReactFlow, Controls, Background, applyNodeChanges,  } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from './CustomNode';

const initialNodes = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        data: { value: 'ankit' },
        // width: 400,
        // height: 80,
        // style: {
        //     background: '#fff',
        //     fontSize: 20,
        // },
        type: 'customNode'
    },
]

const nodeTypes = { customeNode: CustomNode };

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
                    position: { x: centerX - 75, y: centerY - 40 }, 
                    data: { value: 'ankit' },
                    // width: 400,
                    // height: 80,
                    // style: {
                    //     background: '#fff',
                    //     fontSize: 20,
                        
                    // },
                    type: 'customNode'
                },
            ]);
        };
        setNodeInCenter();

        window.addEventListener('resize', setNodeInCenter);

        return () => {
            window.removeEventListener('resize', setNodeInCenter);
        };
    }, []);

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes],
    );

    return (
        <div style={{ height: '91vh', width: '100vw', overflow: 'hidden', margin: 0}} className='text-slate-500 font-semibold'>
            <ReactFlow
                nodes={nodes}
                onNodesChange={onNodesChange}
                nodeTypes={nodeTypes}
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}
