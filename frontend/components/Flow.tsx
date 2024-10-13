"use client";

import { useEffect, useState } from "react";
import { ReactFlow, Controls, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CustomNode from "./CustomNode";

const BACKEND_URL = process.env.NEXT_PUBLIC_URL;
interface Event {
    id: string,
    name: string,
    image: string
}

const initialNodes = [
    {
        id: '1',
        position: { x: 0, y: 0 },
        data: { label: <CustomNode title="Trigger" index={1} onClick={() => alert("Trigger")}>Select the event that starts your Zap</CustomNode> },
        width: 500,
        style: {
            fontSize: 20,
        },
    }, {
        id: '2',
        position: { x: 0, y: 0 },
        data: {
            label: <CustomNode title={"actionTitle"} index={2} onClick={() => {

            }}>{"selectedActionDesc"}</CustomNode>,
        },
        width: 500,
        style: {
            fontSize: 20,
        },
    },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function Flow() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);
    const [centerX, setCenterX] = useState(0);
    const [centerY, setCenterY] = useState(0);
    const [counter, setCounter] = useState(3);
    const [loading, setLoading] = useState(true);
    const [indexOfCurrNode, setIndexOfCurrNode] = useState<number>(1);
    const [verticalPosition, setVerticalPosition] = useState(280);
    const [isModelOpen, setIsModalOpen] = useState(false);
    const [selectedTrigger, setSelectedTrigger] = useState<Event>({
        id: "",
        name: "",
        image: ""
    });
    const [selectedActions, setSelectedActions] = useState<Event[]>([])

    useEffect(() => {
        const setNodeInCenter = () => {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            setCenterX(viewportWidth / 2);
            setCenterY(viewportHeight / 2);

            setNodes([
                {
                    id: '1',
                    position: { x: centerX - 255, y: centerY - 280 },
                    data: {
                        label: <CustomNode title={selectedTrigger?.name ? selectedTrigger?.name : "Trigger"} index={1} onClick={() => {
                            setIndexOfCurrNode(1);
                            setIsModalOpen(true);
                        }}>{"selectedTriggerDesc"}</CustomNode>,
                    },
                    width: 500,
                    style: {
                        fontSize: 20,
                    },
                }, {
                    id: '2',
                    position: { x: centerX - 255, y: centerY - 10 },
                    data: {
                        label: <CustomNode title={selectedActions?.length !== 0 ? selectedActions[0]?.name : "Action"} index={2} onClick={() => {
                            setIndexOfCurrNode(2);
                            setIsModalOpen(true);
                        }}>{"selectedActionDesc"}</CustomNode>,
                    },
                    width: 500,
                    style: {
                        fontSize: 20,
                    },
                },

            ]);

            setEdges([{ id: 'e1-2', source: '1', target: '2' }])
        };
        setNodeInCenter();

        window.addEventListener('resize', setNodeInCenter);

        return () => {
            window.removeEventListener('resize', setNodeInCenter);
        };
    }, [centerX, centerY]);

    useEffect(() => {
        fetch(`${BACKEND_URL}/api/v1/trigger/available`)
            .then(async (res) => {
                if (!res.ok) {
                    throw new Error("Something went wrong while fetching triggers for modal");
                }
                const data = await res.json();
                console.log("this is fetch for triggers");
                console.log(data.availableTrigger);
                setSelectedTrigger(data.availableTrigger[0])
            }).catch((err: any) => {
                console.error(err);
            }).finally(() => {
                fetch(`${BACKEND_URL}/api/v1/action/available`)
                    .then(async (res) => {
                        if (!res.ok) {
                            throw new Error("Something went wrong while fetching the actions");
                        }
                        const data = await res.json();
                        console.log("this is fetch for actions");
                        console.log(data.availableAction);
                        setSelectedActions(data.availableAction);
                    }).catch((err) => {
                        console.error(err);
                    }).finally(() => {
                        setLoading(false);
                    })
            })
    }, []);

    const handleModalSelect = (selectedEvent: Event, currEventIndex: number) => {
        setNodes(a => {
            const updatedNodes = a.map((event) => {
                if (currEventIndex.toString() === event.id) {
                    return {
                        ...event, 
                        data: {
                            ...event.data, 
                            label: (
                                <CustomNode
                                    title={selectedEvent.name}
                                    index={currEventIndex}
                                    onClick={() => {
                                        setIndexOfCurrNode(currEventIndex);
                                        setIsModalOpen(true);
                                    }}
                                >
                                    {"selectedActionDesc"}
                                </CustomNode>
                            ),
                        },
                    };
                }
                return event;
            });

            return updatedNodes;
        });

        setIsModalOpen(false); 
    };

    
    return <div style={{ height: '91vh', width: '100vw', overflow: 'hidden', margin: 0, position: 'relative' }}>
        <button className="z-50 cursor-pointer" onClick={() => {
            setCounter(c => c + 1);
            setNodes(a => {
                const newArray = [...a];
                newArray.push({
                    id: counter.toString(),
                    position: { x: centerX - 255, y: centerY + verticalPosition },
                    data: {
                        label: <CustomNode title={"Action"} index={counter} onClick={() => {
                            setIndexOfCurrNode(counter)
                            setIsModalOpen(true);
                        }}>{"selectedActionDesc"}</CustomNode>,
                    },
                    width: 500,
                    style: {
                        fontSize: 20,
                    },
                })
                return newArray;
            });
            setEdges(e => [...e, { id: `e${counter - 1}-${counter}`, source: (counter - 1).toString(), target: counter.toString() }])
            setVerticalPosition(v => v + 280);

        }}>Add Action</button>
        <ReactFlow
            edges={edges}
            nodes={nodes}
            colorMode="dark"
            style={{ pointerEvents: isModelOpen ? 'none' : 'auto' }}
        >
            <Background />
            <Controls />
        </ReactFlow>
        {isModelOpen && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Modal
                index={indexOfCurrNode}
                loading={loading}
                onClose={() => setIsModalOpen(false)}
                onEventSelect={handleModalSelect}
                actions={selectedActions}
                trigger={selectedTrigger}
            />
        </div>}

    </div>
}

interface ModalProps {
    index: number;
    loading: boolean;
    onClose: () => void;
    onEventSelect: (selectedEvent: Event, index: number) => void;
    actions: Event[];
    trigger: Event
}

const Modal: React.FC<ModalProps> = ({ index, onClose, onEventSelect, loading, actions, trigger }) => {
    console.log(typeof(actions));
    console.log(actions);
    return (
        <div className="fixed inset-0 bg-neutral-950 bg-opacity-70 flex justify-center items-center z-50 ">
            {loading ? "loading..." : <div className="bg-zinc-900 rounded-lg p-6 text-slate-400">
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

                {actions.map((action: Event, key: any) => {
                    console.log("this is key " , key);
                    return <div key={key} className="grid grid-cols-2 gap-3 mb-4">
                        <button onClick={() => onEventSelect(action, index)} className="bg-gray-700 p-2 rounded">
                            {action.name}
                        </button>
                    </div>
                })}


                <div className="text-sm">
                    <h3 className="font-bold mb-2">Popular built-in tools</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => onEventSelect(trigger, index)} className="bg-gray-700 p-2 rounded">
                            {trigger.name}
                        </button>
                    </div>
                </div>
            </div>}

        </div>
    );
};
