"use client";

import { ReactNode } from "react";

export const PrimaryButton = ({ children, onClick, styles }: {
    children: ReactNode,
    onClick: () => void,
    styles: string
}) => {
    return <button
        onClick={onClick}
        className={`
                rounded-full 
                text-slate-300 
                ${styles}
                font-semibold`}
    >
        {children}
    </button>
}