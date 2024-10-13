import { ReactNode } from "react";

export default function CustomNode({ children, title, index, onClick }: {
    children: ReactNode,
    title: string,
    index: number
    onClick: () => void
}) {
    return <div className="hover:cursor-pointer border-violet-500 rounded-md" onClick={onClick}>
        <div className="text-slate-300 text-start text-md flex justify-between">
            <button className="p-1 font-normal bg-gradient-to-r from-violet-700 to-purple-800 rounded-lg m-4">
                <div className="flex">
                    <div className="content-center px-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="violet" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                        </svg>

                    </div>

                    <div className="pr-2">
                        {title}
                    </div>
                </div>
            </button>
        </div>
        <div className="flex ml-3">
            <div className="text-slate-400">
                {index}.
            </div>
            <div className="text-slate-600 text-start px-4 pb-2">
                {children}
            </div>

        </div>
    </div>
}