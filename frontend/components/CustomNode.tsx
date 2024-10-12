import { Handle, Position } from "@xyflow/react";
import { ReactNode } from "react";

const handleStyle = { left: 10 };

export default function CustomNode({ data, isConnectable }: {
    data: ReactNode,
    isConnectable: boolean
}) {
    return <div className="bg-slate-400">
        <Handle
            type="target"
            position={Position.Top}
            isConnectable={isConnectable}
        />
        <div className="text-slate-800">
            <button className="p-2 border rounded-md">{data}</button>
        </div>
        <div className="text-slate-600">
            {data}
        </div>
        <Handle
            type="source"
            position={Position.Bottom}
            id="a"
            style={handleStyle}
            isConnectable={isConnectable}
        />
        <Handle
            type="source"
            position={Position.Bottom}
            id="b"
            isConnectable={isConnectable}
        />
    </div>
}