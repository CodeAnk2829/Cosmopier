"use client";

import { ReactNode } from "react";

export const LinkButton = ({ children, onClick }: {
    children: ReactNode,
    onClick: () => void
}) => {
    return <div className="px-4 content-center" onClick={onClick}>
        { children }
    </div>
}